// pages/TemplatesPage.ts
import { Page, expect } from '@playwright/test';

export class TemplatesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto('https://24slides.com/templates/featured');
  }

  async verifyLandingPage() {
    await expect(this.page).toHaveTitle(/Free Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*feature/);
  }

  async verifyProfileVisible() {
    await expect(this.page.getByRole('link', { name: 'MY PROFILE' })).toBeVisible({ timeout: 120000 });
  }

  async verifyErrorMessageVisible() {
    await expect(this.page.locator('text=Invalid email or password')).toBeVisible(); 
  }
}
