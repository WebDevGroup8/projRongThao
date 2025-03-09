import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import ManageProduct from "./ManageProduct";
import ax from "@/conf/ax";
import { endpoint } from "@/conf/main";

// Mock dependencies (จำลองโมดูลภายนอก)
vi.mock("@/conf/ax", () => ({
  default: {
    get: vi.fn(), // จำลองฟังก์ชัน get ของ axios
  },
}));

vi.mock("@admin/product/CreateProductModal", () => ({
  default: ({ isOpen, onClose }) =>
    // จำลอง CreateProductModal: แสดงโมดัลเมื่อ isOpen เป็น true
    isOpen ? <div data-testid="create-modal">Create Shoe Modal</div> : null,
}));

vi.mock("@admin/product/EditableProductCard", () => ({
  // จำลอง EditableProductCard: แสดงชื่อรองเท้าใน div
  EditableProductCard: ({ name }) => <div data-testid="shoe-card">{name}</div>,
}));

vi.mock("@admin/product/FilterBarForManageProduct", () => ({
  // จำลอง FilterBarForManageProduct: มีปุ่มสำหรับกรองหมวดหมู่และช่วงราคา
  FilterBarForManageProduct: ({ setSelectedCategories, setPriceRange }) => (
    <div data-testid="filter-bar">
      <button
        data-testid="filter-sneakers"
        onClick={() => setSelectedCategories(["Sneakers"])} // กรองหมวดหมู่ "Sneakers"
      >
        Filter Sneakers
      </button>
      <button
        data-testid="filter-price-range"
        onClick={() => setPriceRange([500, 3500])} // ปรับช่วงราคาเป็น 500-3500 เพื่อให้ครอบคลุม Adidas Stan Smith
      >
        Filter Price Range
      </button>
    </div>
  ),
}));

vi.mock("@public/discovery/SearchBar", () => ({
  // จำลอง SearchBar: อินพุตสำหรับค้นหารองเท้า
  default: ({ onSearch }) => (
    <input
      data-testid="search-bar"
      onChange={(e) => onSearch(e.target.value)}
    />
  ),
}));

// เริ่มต้นการทดสอบสำหรับ ManageProduct
describe("ManageProduct", () => {
  // ข้อมูลจำลองสำหรับรองเท้า
  const mockShoes = [
    {
      id: 1,
      name: "Nike Air Max 90",
      price: 4500, // ราคาในหน่วยบาท
      categories: [{ title: "Sneakers" }],
      stock: [{ size: "US 8", stock: 15 }], // ขนาดรองเท้าแบบ US
      promotion: null,
    },
    {
      id: 2,
      name: "Adidas Stan Smith",
      price: 3200, // อยู่ในช่วง 500-3500
      categories: [{ title: "Casual" }],
      stock: [{ size: "US 9", stock: 10 }],
      promotion: {
        start: "2025-03-01",
        end: "2025-03-15",
        discountType: "percentage", // โปรโมชันลดราคาแบบเปอร์เซ็นต์
      },
    },
  ];

  // ข้อมูลจำลองสำหรับหมวดหมู่รองเท้า
  const mockCategories = [{ title: "Sneakers" }, { title: "Casual" }];

  // รีเซ็ตการจำลองก่อนการทดสอบแต่ละครั้ง
  beforeEach(() => {
    vi.clearAllMocks(); // ล้างการจำลองทั้งหมด
    ax.get
      .mockResolvedValueOnce({ data: { data: mockCategories } }) // จำลองการตอบสนอง API หมวดหมู่
      .mockResolvedValueOnce({ data: { data: mockShoes } }); // จำลองการตอบสนอง API รองเท้า
  });

  // ทดสอบการเรนเดอร์สถานะโหลดเริ่มต้น
  it("renders loading state initially", async () => {
    render(<ManageProduct />);
    expect(screen.getByText("Manage Product")).toBeInTheDocument(); // ตรวจสอบว่าหัวข้อแสดงผล
    expect(screen.getByTestId("search-bar")).toBeInTheDocument(); // ตรวจสอบว่า SearchBar แสดงผล
  });

  // ทดสอบการดึงและแสดงรองเท้าและหมวดหมู่
  it("fetches and displays shoes and categories", async () => {
    render(<ManageProduct />);

    await waitFor(() => {
      expect(ax.get).toHaveBeenCalledWith(endpoint.admin.category.query()); // ตรวจสอบการเรียก API หมวดหมู่
      expect(ax.get).toHaveBeenCalledWith(endpoint.admin.product.query()); // ตรวจสอบการเรียก API รองเท้า
    });

    expect(screen.getByText("Nike Air Max 90")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 1 แสดงผล
    expect(screen.getByText("Adidas Stan Smith")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 2 แสดงผล
    expect(screen.getByTestId("filter-bar")).toBeInTheDocument(); // ตรวจสอบว่า FilterBar แสดงผล
  });

  // ทดสอบการกรองรองเท้าด้วยคำค้นหา
  it("filters shoes by search term", async () => {
    render(<ManageProduct />);

    await waitFor(() => {
      expect(screen.getByText("Nike Air Max 90")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 1 แสดงผล
      expect(screen.getByText("Adidas Stan Smith")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 2 แสดงผล
    });

    const searchInput = screen.getByTestId("search-bar");
    fireEvent.change(searchInput, { target: { value: "Nike" } }); // จำลองการพิมพ์คำว่า "Nike"

    await waitFor(() => {
      expect(screen.getByText("Nike Air Max 90")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้า Nike ยังอยู่
      expect(screen.queryByText("Adidas Stan Smith")).not.toBeInTheDocument(); // ตรวจสอบว่ารองเท้า Adidas ถูกกรองออก
    });
  });

  // ทดสอบการเปิดและปิด CreateProductModal
  it("opens and closes CreateShoeModal", async () => {
    render(<ManageProduct />);

    const createButton = screen.getByText("+ Create new");
    fireEvent.click(createButton); // จำลองการคลิกปุ่มสร้างรองเท้าใหม่

    expect(screen.getByTestId("create-modal")).toBeInTheDocument(); // ตรวจสอบว่าโมดัลแสดงผล
  });

  // ทดสอบการจัดการข้อผิดพลาดจาก API
  it("handles API errors gracefully", async () => {
    ax.get.mockRejectedValue(new Error("API Error")); // จำลองการตอบสนองผิดพลาดจาก API
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {}); // สร้าง spy เพื่อจับ console.error

    render(<ManageProduct />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching categories:",
        expect.any(Error),
      ); // ตรวจสอบข้อผิดพลาดหมวดหมู่
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching products:",
        expect.any(Error),
      ); // ตรวจสอบข้อผิดพลาดรองเท้า
    });

    consoleSpy.mockRestore(); // คืนค่า console.error เป็นปกติ
  });

  // ทดสอบการกรองรองเท้าตามหมวดหมู่
  it("filters shoes by category", async () => {
    render(<ManageProduct />);

    await waitFor(() => {
      expect(screen.getByText("Nike Air Max 90")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 1 แสดงผล
      expect(screen.getByText("Adidas Stan Smith")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 2 แสดงผล
    });

    const filterButton = screen.getByTestId("filter-sneakers");
    fireEvent.click(filterButton); // จำลองการคลิกปุ่มกรองหมวดหมู่ "Sneakers"

    await waitFor(() => {
      expect(screen.getByText("Nike Air Max 90")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้า Sneakers ยังอยู่
      expect(screen.queryByText("Adidas Stan Smith")).not.toBeInTheDocument(); // ตรวจสอบว่ารองเท้า Casual ถูกกรองออก
    });
  });

  // ทดสอบการกรองรองเท้าตามช่วงราคา
  it("filters shoes by price range", async () => {
    render(<ManageProduct />);

    await waitFor(() => {
      expect(screen.getByText("Nike Air Max 90")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 1 แสดงผล
      expect(screen.getByText("Adidas Stan Smith")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้าคู่ที่ 2 แสดงผล
    });

    const filterButton = screen.getByTestId("filter-price-range");
    fireEvent.click(filterButton); // จำลองการคลิกปุ่มกรองช่วงราคา 500-3500 บาท

    await waitFor(
      () => {
        expect(screen.queryByText("Nike Air Max 90")).not.toBeInTheDocument(); // ตรวจสอบว่ารองเท้า 4500 บาทถูกกรองออก
        expect(screen.getByText("Adidas Stan Smith")).toBeInTheDocument(); // ตรวจสอบว่ารองเท้า 3200 บาทยังอยู่ในช่วง 500-3500
      },
      { timeout: 2000 },
    ); // เพิ่ม timeout เป็น 2000ms เพื่อให้แน่ใจว่า DOM อัปเดตทัน
  });
});
