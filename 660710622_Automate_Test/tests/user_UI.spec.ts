import { test, expect } from '@playwright/test';

test('TC001 Login Success', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/homebooking/);
});

test('TC002 Invalid Login', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/');

  await page.getByPlaceholder('Username').fill('661211319@@@@');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/invalid username or password/i)).toBeVisible();

});

test('TC003 Go to Booking Page', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.click('text=จองสนาม');
  await expect(page).toHaveURL(/booking/);

});

test('TC004 displays all menu items', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('text=หน้าแรก')).toBeVisible();
  await expect(page.locator('text=รายการจองวันนี้')).toBeVisible();
  await expect(page.locator('text=การจองของฉัน')).toBeVisible();
  await expect(page.locator('text=โปรไฟล์')).toBeVisible();
});

test('TC005 Logout Success', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.click('text=โปรไฟล์');
  await page.click('text=Logout');

  await expect(page).toHaveURL(/login/);
});