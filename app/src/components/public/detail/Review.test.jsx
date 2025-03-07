import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Review from "@public/detail/Review";
import ax from "@/conf/ax";

describe("Review Component", () => {
  let mockSetReviews;
  let mockUser;

  beforeEach(() => {
    mockSetReviews = vi.fn();
    mockUser = { id: 1, username: "customer1" }; // Mock user data

    // Spy on the actual API calls
    vi.spyOn(ax, "post");
  });

  it("should disable the submit button if no rating or review text", () => {
    render(
      <Review
        user={mockUser}
        productId={1}
        averageRating={4.5}
        setAverageRating={() => {}}
        reviews={[]}
        setReviews={mockSetReviews}
      />,
    );

    const submitButton = screen.getByTestId("submit-review-button");

    // Submit button should be disabled initially
    expect(submitButton).toBeDisabled();

    // Enter a review comment without selecting a rating
    const textarea = screen.getByTestId("review-textarea");
    fireEvent.change(textarea, { target: { value: "Good product!" } });

    expect(submitButton).toBeDisabled();

    // Select a rating but clear the comment
    fireEvent.change(textarea, { target: { value: "" } });
    const ratingStar = screen.getByTestId("rate-star-5");
    fireEvent.click(ratingStar);

    expect(submitButton).toBeDisabled();
  });

  it("should allow users to submit a review", async () => {
    render(
      <Review
        user={mockUser}
        productId={1}
        averageRating={4.5}
        setAverageRating={() => {}}
        reviews={[]}
        setReviews={mockSetReviews}
      />,
    );

    // Simulate selecting a rating (5 stars)
    const ratingStars = [1, 2, 3, 4, 5].map((star) =>
      screen.getByTestId(`rate-star-${star}`),
    );
    fireEvent.click(ratingStars[4]);

    const textarea = screen.getByTestId("review-textarea");
    fireEvent.change(textarea, { target: { value: "Great product!" } });

    expect(textarea).toHaveValue("Great product!");

    // Ensure submit button is enabled
    const submitButton = screen.getByTestId("submit-review-button");
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    // Verify that the API POST request was made
    await waitFor(() => {
      expect(ax.post).toHaveBeenCalled();
    });
  });

  it("should recalculate average rating when a new review is added", async () => {
    render(
      <Review
        user={mockUser}
        productId={1}
        averageRating={3.5}
        setAverageRating={vi.fn()}
        reviews={[
          {
            id: 1,
            rating: 3,
            comment: "Okay product",
            user: { username: "A" },
          },
          {
            id: 2,
            rating: 4,
            comment: "Good product",
            user: { username: "B" },
          },
        ]}
        setReviews={mockSetReviews}
      />,
    );

    expect(screen.getByText("3.5 out of 5")).toBeInTheDocument();
  });
});
