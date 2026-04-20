import { test, expect } from '@playwright/test';
import { MyBookingPage } from '../pages/my-booking-page';

test.describe('ระบบจองสนาม - หมวดการจองของฉัน', () => {
  let bookingPage: MyBookingPage;

  test.beforeEach(async ({ page }) => {
    bookingPage = new MyBookingPage(page);

    await page.goto('https://su-courtbooking.vercel.app/');

    await page.getByPlaceholder('Username').fill('661211319');
    await page.getByPlaceholder('Password').fill('users002');
    await page.getByRole('button', { name: 'login' }).click();

    await bookingPage.navigateToMyBooking();
  });

  test('TC01 - ควรแสดงหัวข้อและส่วนการจองวันนี้ได้อย่างถูกต้อง', async () => {
    await expect(bookingPage.todayHeader).toBeVisible();
  });

  test('TC02 - หากมีรายการจอง ต้องสามารถคลิกยกเลิกการจองได้', async () => {
    const btnCount = await bookingPage.cancelBtn.count();
    if (btnCount > 0) {
      await bookingPage.cancelFirstBooking();
    }
  });

  test('TC03 - ควรแสดงหัวข้อประวัติการจองในหน้าเดียวกัน', async () => {
    await expect(bookingPage.historyHeader).toBeVisible();
  });

  test('TC04 - ควรแสดงข้อความให้เลือกวันที่เพื่อค้นหา ในส่วนประวัติการจอง', async () => {
    await expect(bookingPage.historyInitialText).toBeVisible();
  });

  test('TC05 - หน้าจอต้องทำงานได้สมบูรณ์ ทั้งการจองวันนี้และประวัติการจองร่วมกัน', async () => {
    await expect(bookingPage.todayHeader).toBeVisible();
    await expect(bookingPage.historyHeader).toBeVisible();
  });
});