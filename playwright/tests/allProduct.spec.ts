import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173/discovery"

test("Should display product details correctly", async ({ page }) => {
    await page.goto(BASE_URL); 
  
    const product = page.locator('[data-testid="product-item"]').first();
    await expect(product).toBeVisible(); 
  });

  test("Fetch Product correctly", async ({ page }) => {
    await page.goto(BASE_URL); 

    const response = await page.waitForResponse(async (response) => {
        return response.url().includes("/api/products") && response.status() === 200;
    });
    const responseData = await response.json();
    expect(responseData).toHaveProperty("data");
    expect(responseData.data).toBeInstanceOf(Array);
    expect(responseData.data.length).toBeGreaterThan(0);
});