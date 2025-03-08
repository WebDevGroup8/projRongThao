import { test, expect } from '@playwright/test';

const LOGIN_URL = `${process.env.BASE_URL}/login`;
const MANAGE_CATEGORIES_URL = `${process.env.BASE_URL}/admin/category`;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DASHBOARD_URL = `${process.env.BASE_URL}/admin/dashboard`;

test.describe('Admin Create Category E2E', () => {
  test('should login as Admin1 and create a new category', async ({ page }) => {
    // 1. Login
    await page.goto(LOGIN_URL);
    await page.fill('input[name="identifier"]', ADMIN_USERNAME!);
    await page.fill('input[name="password"]', ADMIN_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForURL(DASHBOARD_URL, { timeout: 10000 });
    await expect(page.url()).toBe(DASHBOARD_URL);

    // 2. ไปที่หน้า Manage Categories
    await page.goto(MANAGE_CATEGORIES_URL);
    await expect(page).toHaveURL(MANAGE_CATEGORIES_URL);

    // 3. เปิด Modal และกรอกข้อมูล
    const addButton = page.getByText('+ Add New');
    await expect(addButton).toBeVisible();
    await addButton.click();

    const modalTitle = page.getByText('Add New Category');
    await expect(modalTitle).toBeVisible();
    await page.fill('input[required]', 'sandals'); // ชื่อ Category
    await page.fill('textarea[placeholder="Enter category details"]', 'sandals 5555'); // รายละเอียด
    await page.click('button:text("Create")');

    // 4. ตรวจสอบผลลัพธ์
    const toastSuccess = page.locator('.Toastify__toast--success', { hasText: '🎉 Category Created Successfully!' });
    await expect(toastSuccess).toBeVisible({ timeout: 5000 });

  });
});