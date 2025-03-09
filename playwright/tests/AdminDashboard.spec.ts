import { test, expect } from '@playwright/test';



function randomStatus() {

    const statusNames = [
      "Pending", "Abandoned", "Paid", "Shipped", "Completed", "Canceled"
    ];
    const randomIndex = Math.floor(Math.random() * statusNames.length); 
    return statusNames[randomIndex];
  }

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  //log in เข้าระบบ
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).click();

  //log in โดยใช้ Admin เพื่อเข้าหน้า dashboard
  await page.getByRole('textbox', { name: 'Username or email' }).fill('Admin1');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign in' }).click();

  //ไปที่หน้า dashboard
  await expect(page).toHaveURL('http://localhost:5173/admin/dashboard');
  
  //ขึ้นตาราง order
  const OrderTable = page.getByText('PRODUCT');
  await expect(OrderTable).toBeVisible();

  //ขึ้นตารางcustomer
  const customerTable = page.getByText('EMAIL');
  await page.getByRole('button', { name: 'Customer' }).click();
  await expect(customerTable).toBeVisible();

 // ตรวจว่า checkbox สามารถใช้ได้
  const status = randomStatus();
  await page.getByRole('checkbox', { name: status }).check(); // Set checkbox state
  await expect(page.getByRole('checkbox', { name: status })).toBeChecked(); // Verify
});