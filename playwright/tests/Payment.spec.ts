import { test, expect } from "@playwright/test";

const HOME_URL = "http://localhost:5173/";
const BASE_URL = "http://localhost:5173/product/16";
const LOGIN_URL = "http://localhost:5173/login";
const USER_EMAIL = process.env.CUSTOMER_USERNAME;
const USER_PASSWORD = process.env.CUSTOMER_PASSWORD;

test.describe("Product Display with Login", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto(LOGIN_URL);

    // Fill in the login form
    await page.fill('input[name="identifier"]', USER_EMAIL!);
    await page.fill('input[name="password"]', USER_PASSWORD!);

    // Click the login button
    await page.click('button[type="submit"]');

    // Ensure login is successful (Check if redirected or check for user UI element)
    await page.waitForURL(HOME_URL);

    // Navigate to product page after login
    await page.goto(BASE_URL);
  });

  test("Selecting size and clicking 'Buy It Now' redirects to Stripe checkout", async ({ page }) => {
    // Locate and click the dropdown button to open size options
    const sizeDropdown = page.locator('[data-testid="select-size-button"]'); // Adjust if needed
    await expect(sizeDropdown).toBeVisible();
    await sizeDropdown.click();

    // Wait for the dropdown list to appear
    const sizeOptions = page.locator("ul > li > a"); // Locate the size options inside the dropdown
    await expect(sizeOptions.first()).toBeVisible();
    const allSizes = await sizeOptions.allInnerTexts();
    // console.log("All sizes found:", allSizes);

    // Click the first available size that is **not out of stock**
    const availableSize = sizeOptions.filter({ hasNot: page.locator(".bg-gray-300") }).first();

    const selectedSize = await availableSize.allInnerTexts();
    // console.log("size:", selectedSize);

    await availableSize.click();

    // const availableSizeText = await availableSize.textContent();
    // console.log(availableSizeText);
    const selectedSizeNumber = selectedSize?.[0].split("\n")[0];
    // console.log("selected size:", selectedSizeNumber);
    const selectedText = await sizeDropdown.allInnerTexts();
    // console.log(selectedText[0]);
    // Ensure the selected size is now displayed in the dropdown button
    await expect(sizeDropdown).toContainText(selectedSizeNumber!);

    // Find the "Buy It Now" button
    const buyNowButton = page.getByRole("button", { name: /BUY IT NOW/i });

    // Ensure the button is visible and enabled
    await expect(buyNowButton).toBeVisible();
    await expect(buyNowButton).toBeEnabled();

    // Click the "Buy It Now" button
    await buyNowButton.click();

    // Wait for navigation (assuming it redirects to Stripe)
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 5000 });

    // Confirm the URL contains Stripe's checkout domain
    expect(page.url()).toMatch(/checkout\.stripe\.com/);

    // Fill in Email
    await page.fill('input[name="email"]', "test@example.com");

    // Fill in Shipping Information (Modify as needed)
    await page.fill('input[name="shippingName"]', "John Doe");
    await page.fill('input[name="shippingAddressLine1"]', "123 Main Street");
    await page.fill('input[name="shippingAddressLine2"]', "Apt 4B");
    await page.fill('input[name="shippingDependentLocality"]', "Bangkok");
    await page.fill('input[name="shippingLocality"]', "Bangkok");

    // Wait for the dropdown to be visible
    const provinceDropdown = page.locator('select[name="shippingAdministrativeArea"]');
    await expect(provinceDropdown).toBeVisible();

    // Select an option by value (for example, Bangkok)
    await provinceDropdown.selectOption({ value: "กรุงเทพมหานคร" }); // Change value to the actual province needed

    await page.fill('input[name="shippingPostalCode"]', "10110");

    // Wait for radio button to be interactive
    const paymentMethod = page.locator("#payment-method-accordion-item-title-card");
    await expect(paymentMethod).toBeVisible();
    console.log(await paymentMethod.isChecked());
    await paymentMethod.check({ force: true });
    // Wait for card input fields to appear before filling
    const cardNumberInput = page.locator('input[name="cardNumber"]');
    await expect(cardNumberInput).toBeVisible({ timeout: 5000 }); // Adjust timeout if needed
    await cardNumberInput.fill("4242 4242 4242 4242");

    await page.fill('input[name="cardExpiry"]', "12/34");
    await page.fill('input[name="cardCvc"]', "123");

    // Click the "Pay" button
    const payButton = page.locator("button.SubmitButton.SubmitButton--complete");
    await expect(payButton).toBeVisible({ timeout: 5000 });
    await payButton.click();

    // Wait for the success page
    await page.waitForURL(/success|confirmation|thank-you/i, { timeout: 10000 });

    // Verify successful checkout
    expect(page.url()).toMatch(/success|confirmation|thank-you/i);
  });
});
