import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173/discovery"

test("Should display product details correctly", async ({ page }) => {
    await page.goto(BASE_URL); 
  
    const product = page.locator('[data-testid="product-item"]').first();
    await expect(product).toBeVisible(); 
  });