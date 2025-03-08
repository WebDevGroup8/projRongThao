import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ManageCategory from '@admin/category/ManageCategory'; // ปรับ Path ตามโครงสร้างจริง
import ax from '@/conf/ax';
import AddCategoryModal from '@admin/category/AddCategoryModal';
import EditCategoryModal from '@admin/category/EditCategoryModal';
import DeleteCategoryModal from '@admin/category/DeleteCategoryModal';

// Mock Dependencies - จำลองการทำงานของ Dependencies ภายนอก
vi.mock('@/conf/ax', () => ({
    default: {
        get: vi.fn(), // Mock ax.get เพื่อจำลอง API Call
    },
}));

// Mock Child Components - จำลอง Component ลูกเพื่อไม่ต้องใช้ของจริง
vi.mock('@admin/category/AddCategoryModal', () => ({
    default: ({ isOpen, onClose, fetchCategories }) => (
        isOpen ? <div data-testid="add-modal">Add Category Modal</div> : null // จำลอง Add Modal
    ),
}));
vi.mock('@admin/category/EditCategoryModal', () => ({
    default: ({ isOpen, onClose, category, fetchCategories }) => (
        isOpen ? <div data-testid="edit-modal">Edit Category Modal</div> : null // จำลอง Edit Modal
    ),
}));
vi.mock('@admin/category/DeleteCategoryModal', () => ({
    default: ({ isOpen, onClose, category, fetchCategories }) => (
        isOpen ? <div data-testid="delete-modal">Delete Category Modal</div> : null // จำลอง Delete Modal
    ),
}));

// เริ่มการทดสอบ Component ManageCategory
describe('ManageCategory Component', () => {
    // Setup ก่อนการทดสอบแต่ละเคส
    beforeEach(() => {
        // รีเซ็ต Mock เพื่อให้แต่ละ Test Case ไม่กระทบกัน
        vi.clearAllMocks();
    });

    // ทดสอบการแสดงผลพื้นฐานของหน้า
    it('should render title and table headers', () => {
        // จำลอง API ส่งคืน Category ว่าง
        ax.get.mockResolvedValue({ data: { data: [] } });

        // Render Component
        render(<ManageCategory />);

        // ตรวจสอบว่าหัวข้อและ Header ของตารางแสดงผลถูกต้อง
        expect(screen.getByText('Manage Categories')).toBeInTheDocument(); // เช็กหัวข้อหน้า
        expect(screen.getByText('NAME')).toBeInTheDocument(); // เช็กหัวคอลัมน์ NAME
        expect(screen.getByText('DESCRIPTION')).toBeInTheDocument(); // เช็กหัวคอลัมน์ DESCRIPTION
        expect(screen.getByText('EDIT')).toBeInTheDocument(); // เช็กหัวคอลัมน์ EDIT
        expect(screen.getByText('DELETE')).toBeInTheDocument(); // เช็กหัวคอลัมน์ DELETE
    });

    // ทดสอบกรณีไม่มี Category
    it('should display "No categories found" when there are no categories', async () => {
        // จำลอง API ส่งคืน Category ว่าง
        ax.get.mockResolvedValue({ data: { data: [] } });

        // Render Component
        render(<ManageCategory />);

        // รอให้ Fetch เสร็จแล้วเช็กว่าข้อความ "No categories found" แสดง
        await waitFor(() => {
            expect(screen.getByText('No categories found')).toBeInTheDocument(); // เช็กข้อความเมื่อไม่มี Category
        });
    });

    // ทดสอบการแสดง Category ในตาราง
    it('should display categories in the table', async () => {
        // จำลองข้อมูล Category จาก API
        const mockCategories = [
            { id: 1, title: 'Electronics', detail: 'Gadgets and devices' },
            { id: 2, title: 'Books', detail: 'All kinds of books' },
        ];
        ax.get.mockResolvedValue({ data: { data: mockCategories } });

        // Render Component
        render(<ManageCategory />);

        // รอให้ Fetch เสร็จแล้วเช็กว่าข้อมูล Category แสดงในตาราง
        await waitFor(() => {
            expect(screen.getByText('Electronics')).toBeInTheDocument(); // เช็กชื่อ Category แรก
            expect(screen.getByText('Gadgets and devices')).toBeInTheDocument(); // เช็กรายละเอียด Category แรก
            expect(screen.getByText('Books')).toBeInTheDocument(); // เช็กชื่อ Category ที่สอง
            expect(screen.getByText('All kinds of books')).toBeInTheDocument(); // เช็กรายละเอียด Category ที่สอง
        });
    });

    // ทดสอบการกรอง Category ตามคำค้น
    it('should filter categories based on search term', async () => {
        // จำลองข้อมูล Category จาก API
        const mockCategories = [
            { id: 1, title: 'Electronics', detail: 'Gadgets and devices' },
            { id: 2, title: 'Books', detail: 'All kinds of books' },
        ];
        ax.get.mockResolvedValue({ data: { data: mockCategories } });

        // Render Component
        render(<ManageCategory />);

        // รอให้ Fetch เสร็จแล้วเช็กว่า Category ทั้งหมดแสดงก่อน
        await waitFor(() => {
            expect(screen.getByText('Electronics')).toBeInTheDocument(); // เช็ก Electronics ก่อนกรอง
            expect(screen.getByText('Books')).toBeInTheDocument(); // เช็ก Books ก่อนกรอง
        });

        // จำลองการพิมพ์คำค้น "Books" ใน SearchBar
        const searchInput = screen.getByPlaceholderText(/search/i); // หา Input ของ SearchBar (สมมติว่ามี Placeholder)
        fireEvent.change(searchInput, { target: { value: 'Books' } }); // พิมพ์คำค้น

        // ตรวจสอบว่าการกรองทำงานถูกต้อง
        expect(screen.getByText('Books')).toBeInTheDocument(); // Books ยังอยู่
        expect(screen.queryByText('Electronics')).not.toBeInTheDocument(); // Electronics ถูกกรองออก
    });

    // ทดสอบการเปิด AddCategoryModal
    it('should open AddCategoryModal when clicking Add New button', async () => {
        // จำลอง API ส่งคืน Category ว่าง
        ax.get.mockResolvedValue({ data: { data: [] } });

        // Render Component
        render(<ManageCategory />);

        // หาปุ่ม "+ Add New" และคลิก
        const addButton = screen.getByText('+ Add New');
        fireEvent.click(addButton);

        // ตรวจสอบว่า AddCategoryModal เปิดขึ้น
        expect(screen.getByTestId('add-modal')).toBeInTheDocument(); // เช็กว่า Modal เพิ่ม Category แสดง
    });

    // ทดสอบการเปิด EditCategoryModal
    it('should open EditCategoryModal when clicking Edit icon', async () => {
        // จำลองข้อมูล Category จาก API
        const mockCategories = [
            { id: 1, title: 'Electronics', detail: 'Gadgets and devices' },
        ];
        ax.get.mockResolvedValue({ data: { data: mockCategories } });

        // Render Component
        render(<ManageCategory />);

        // รอให้ Fetch เสร็จแล้วเช็กว่า Category แสดง
        await waitFor(() => {
            expect(screen.getByText('Electronics')).toBeInTheDocument(); // เช็ก Electronics แสดง
        });

        // หา Icon Edit และคลิก
        const editButton = screen.getByTestId('edit-icon-1'); // หา Pencil Icon ด้วย data-testid
        fireEvent.click(editButton);

        // ตรวจสอบว่า EditCategoryModal เปิดขึ้น
        expect(screen.getByTestId('edit-modal')).toBeInTheDocument(); // เช็กว่า Modal แก้ไข Category แสดง
    });

    // ทดสอบการเปิด DeleteCategoryModal
    it('should open DeleteCategoryModal when clicking Delete icon', async () => {
        // จำลองข้อมูล Category จาก API
        const mockCategories = [
            { id: 1, title: 'Electronics', detail: 'Gadgets and devices' },
        ];
        ax.get.mockResolvedValue({ data: { data: mockCategories } });

        // Render Component
        render(<ManageCategory />);

        // รอให้ Fetch เสร็จแล้วเช็กว่า Category แสดง
        await waitFor(() => {
            expect(screen.getByText('Electronics')).toBeInTheDocument(); // เช็ก Electronics แสดง
        });

        // หา Icon Delete และคลิก
        const deleteButton = screen.getByTestId('delete-icon-1'); // หา Trash2 Icon ด้วย data-testid
        fireEvent.click(deleteButton);

        // ตรวจสอบว่า DeleteCategoryModal เปิดขึ้น
        expect(screen.getByTestId('delete-modal')).toBeInTheDocument(); // เช็กว่า Modal ลบ Category แสดง
    });
});