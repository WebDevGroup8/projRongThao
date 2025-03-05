import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173/discovery";
const API_PRODUCTS = "http://localhost:1337/api/products";


let firstProductId;
let responseDataCount;


function randomCategory() {
  const categoryNames = [
    "limited", "new", "on sale", "sport", "high top", 
    "mid top", "low top", "platform", "heel"
  ];
  const randomIndex = Math.floor(Math.random() * categoryNames.length); 
  return categoryNames[randomIndex];
}

test.describe('Product Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    const response = await page.request.get(API_PRODUCTS);
    const data = await response.json();
    firstProductId = data.data[0].id;
    responseDataCount = data.data.length; 
  });


  // ✅ ตรวจสอบ API /api/products
  test("Fetch Product correctly", async ({ page }) => {
    const response = await page.waitForResponse(response =>
      response.url().startsWith(API_PRODUCTS) && response.status() === 200, 
      { timeout: 50000 });
    const responseData = await response.json();
    expect(responseData).toHaveProperty("data");
    expect(Array.isArray(responseData.data)).toBeTruthy();
    expect(responseData.data.length).toBeGreaterThan(0);
  });


  // ✅ ตรวจสอบการแสดงรายการสินค้าให้ตรงกับจำนวนที่ดึงจาก API
  test('should display product list correctly', async ({ page }) => {
    const productCards = await page.locator('[data-testid="product-item"]').count();
    expect(productCards).toEqual(responseDataCount); 
  });


  // ✅ ตรวจสอบว่า ชื่อสินค้าตรงกับที่ดึงมาจาก API
  test('Check product name matches API', async ({ page }) => {
    const response = await page.request.get(API_PRODUCTS);
    const data = await response.json();
    const firstProduct = data.data[0];
    const productNameElement = page.locator('[data-testid="product-item"]').first().locator('h3');
    const displayedName = await productNameElement.textContent();
    expect(displayedName).toContain(firstProduct.name);
  });


  // ✅ ทดสอบการกรองสินค้าโดยการสุ่มเลือกหมวดหมู่
test('should filter products by category', async ({ page }) => {
  const category = randomCategory();
  const categoryCheckbox = page.locator(`[data-testid="category-checkbox-${category}"]`).first();
  const initialProductCount = await page.locator('[data-testid="product-item"]').count();
  await categoryCheckbox.click();
  const filteredProductCount = await page.locator('[data-testid="product-item"]').count();
  expect(filteredProductCount).toBeLessThan(initialProductCount);  
});


 // ✅ ตรวจสอบการคลิกสินค้านำไปยังหน้ารายละเอียด
 test('Click on product navigates to product details page', async ({ page }) => {
  const firstProduct = page.locator('[data-testid="product-item"]').first();
  await firstProduct.click();
  await expect(page).toHaveURL(`http://localhost:5173/product/${firstProductId}`);
});


});
