import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ShoppingCart from "@customer/cart/ShoppingCart";
import useAuthStore from "@/store/store";
import { toast } from "react-toastify";

// Mocking zustand (centraL context)
vi.mock("@/store/store", () => ({
  default: vi.fn(),
}));
// Mocking toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mocking axios
vi.mock("@/conf/ax", () => ({
  default: {
    // Mocking Post
    post: vi.fn().mockResolvedValue({}),
    // Mocking Item in Cart
    get: vi.fn().mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            name: "Test Product",
            stock: [{ size: "32", stock: 5 }],
            price: 100,
            image: [{ formats: { thumbnail: { url: "/test.jpg" } } }],
          },
        ],
      },
    }),
  },
}));

// Mocking endpoint
vi.mock("@/conf/main", () => ({
  endpoint: {
    customer: {
      order: {
        create: vi.fn().mockReturnValue("/api/order/create"),
      },
    },
    public: {
      product: {
        get: vi.fn().mockReturnValue("/api/product"),
      },
    },
  },
  conf: {
    imageUrlPrefix: "https://example.com/uplaod",
  },
}));

// Mock loadStripe
vi.mock("@stripe/stripe-js", () => ({
  loadStripe: vi.fn().mockResolvedValue({
    redirectToCheckout: vi.fn().mockResolvedValue({}),
  }),
}));

// Mock import.meta.env
vi.stubEnv("VITE_STRIPE_PUBLIC_KEY", "test_key");

describe("ShoppingCart", () => {
  let mockUpdateCartItem;
  let mockRemoveFromCart;
  let mockClearCart;

  // Arrange with every test
  beforeEach(() => {
    mockUpdateCartItem = vi.fn();
    mockRemoveFromCart = vi.fn();
    mockClearCart = vi.fn();

    useAuthStore.mockReturnValue({
      user: { id: 1 },
      cart: [
        {
          id: 1,
          name: "Test Product",
          sizeIndex: 0,
          quantity: 1,
          stock: [{ size: "32", stock: 5 }],
          price: 100,
          thumbnailImage: "/test.jpg",
        },
      ],
      updateCartItem: mockUpdateCartItem,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });
  });

  // case 1: rander page
  it("test renders the shopping cart with items", async () => {
    // Act
    render(<ShoppingCart />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Assert
    // Test Product is mock product, So confirm that it shown
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  // case 2: test add button
  it("test user can increase quantity and summary updates", async () => {
    // Act
    render(<ShoppingCart />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const plusButton = screen.getByTestId("plus");
    const quantityDisplay = screen.getByTestId("quantity");
    expect(quantityDisplay).toHaveTextContent("1");
    fireEvent.click(plusButton);

    // Assert
    // Check that updateCartItem was called with the right parameters
    expect(mockUpdateCartItem).toHaveBeenCalledWith(1, 0, 1);
    // Check that number is changes
    // Wait for UI to update
    await waitFor(() => {
      // Quantity should now be 2
      expect(quantityDisplay).toHaveTextContent("2");
    });
  });

  // case 3: test decrease button
  it("test user cannot decrease quantity below 1", async () => {
    // Act
    render(<ShoppingCart />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const minusButton = screen.getByTestId("minus");
    const quantityDisplay = screen.getByTestId("quantity");
    expect(quantityDisplay).toHaveTextContent("1");
    fireEvent.click(minusButton);

    // Assert
    // Expect that updateCartItem was not called
    expect(mockUpdateCartItem).not.toHaveBeenCalled();
    // Check that number is changes
    // Wait for UI to update
    await waitFor(() => {
      // Quantity should not be changes
      expect(quantityDisplay).toHaveTextContent("1");
    });
  });

  // case 4: test that user cannot increase beyon limit
  it("test user cannot increase quantity beyond stock limit", async () => {
    // Arrange
    useAuthStore.mockReturnValue({
      user: { id: 1 },
      cart: [
        {
          id: 1,
          name: "Test Product",
          sizeIndex: 0,
          quantity: 5, // At stock limit
          stock: [{ size: "32", stock: 5 }],
          price: 100,
          thumbnailImage: "/test.jpg",
        },
      ],
      updateCartItem: mockUpdateCartItem,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    // Act
    render(<ShoppingCart />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const plusButton = screen.getByTestId("plus");
    const quantityDisplay = screen.getByTestId("quantity");
    // Check that its on bound
    expect(quantityDisplay).toHaveTextContent("5");
    fireEvent.click(plusButton);

    // Assert
    // Expect an error toast
    expect(toast.error).toHaveBeenCalledWith(
      "Only 5 items available in stock.",
    );
  });

  // case 5: remove item from cart
  it("test user can remove an item from cart", async () => {
    // Act
    render(<ShoppingCart />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const removeButton = screen.getByTestId("remove");
    fireEvent.click(removeButton);

    // Assert
    // Check that removeFromCart was called
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1, 0);
    // Check return Your cart is empty
    await waitFor(() => {
      expect(screen.queryByText(/Your cart is empty/i)).toBeInTheDocument();
    });
  });
});
