import { type Locator, type Page, expect } from '@playwright/test';

export class MyBookingPage {
  readonly page: Page;
  readonly menuMyBooking: Locator;
  readonly todayHeader: Locator;
  readonly historyHeader: Locator;
  readonly cancelBtn: Locator;
  readonly confirmModalBtn: Locator;
  readonly historyInitialText: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.menuMyBooking = page.locator('a[href="/mybookings"]').first();
    
    this.todayHeader = page.getByRole('heading', { name: 'การจองวันนี้' });
    this.historyHeader = page.getByRole('heading', { name: 'ประวัติการจอง' });
    
    this.cancelBtn = page.getByRole('button', { name: 'ยกเลิก' });
    
    this.confirmModalBtn = page.getByRole('button', { name: 'ยืนยัน' });
    
    this.historyInitialText = page.getByText('เลือกวันที่เพื่อค้นหา');
  }

  async navigateToMyBooking() {
    await this.menuMyBooking.click();
    await this.todayHeader.waitFor({ state: 'visible' });
  }

  async cancelFirstBooking() {
    await this.cancelBtn.first().click();
    await this.confirmModalBtn.waitFor({ state: 'visible' });
    await this.confirmModalBtn.click();
  }
}