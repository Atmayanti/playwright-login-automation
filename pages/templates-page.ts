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

  async acceptCookies() {
    await this.page.getByRole('link', { name: 'I agree' }).click();
  }

  async verifyLandingPage() {
    await expect(this.page).toHaveTitle(/Free Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*feature/);
  }

  async verifyProfileVisible() {
    await expect(this.page.getByRole('link', { name: 'MY PROFILE' })).toBeVisible({ timeout: 120000 });
  }

  async verifyAllPagesAreAccessible(){
    await this.page.getByRole('link', { name: 'Featured' }).click();
    await expect(this.page).toHaveTitle(/Free Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*feature/);
    await this.page.getByRole('link', { name: 'Most Popular Templates' }).click();
    await expect(this.page).toHaveTitle(/Most Popular Free Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*most-popular/);
    await this.page.getByRole('link', { name: 'Corporate & Business Model' }).click();
    await expect(this.page).toHaveTitle(/Free Corporate Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*corporate-business-models/);
    await this.page.getByRole('link', { name: 'Data (Tables, Graphs & Charts)' }).click();
    await expect(this.page).toHaveTitle(/Free Data Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*data-tables-graphs-charts/);
    await this.page.getByRole('link', { name: 'Organization & Planning' }).click();
    await expect(this.page).toHaveTitle(/Organization & Planning/);
    await expect(this.page).toHaveURL(/.*organization-planning/);
    await this.page.getByRole('link', { name: 'Text Slides' }).click();
    await expect(this.page).toHaveTitle(/Free Text Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*text-slides/);
    await this.page.getByRole('link', { name: 'Maps' }).click();
    await expect(this.page).toHaveTitle(/Free Maps Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*maps/);
    await this.page.getByRole('link', { name: 'Other' }).click();
    await expect(this.page).toHaveTitle(/Other Free Powerpoint Templates by 24Slides/);
    await expect(this.page).toHaveURL(/.*other/);
    await this.page.getByRole('link', { name: 'Our Presentation Services' }).click();
    await expect(this.page).toHaveTitle(/Presentation Design Services by 24Slides/);
    await expect(this.page).toHaveURL(/.*Templates_Menu/);
  }

  async accessPresentationDetail() {
    await this.page.getByRole('link', { name: 'Mexican Taco PowerPoint Slide' }).click();
    await expect(this.page).toHaveTitle(/Mexican Food Powerpoint Template | Free Download/);
    await expect(this.page).toHaveURL(/.*mexican-food-powerpoint-template/);
  }

  async downloadAfterLogin(){
    const [download] = await Promise.all([
        await this.page.waitForEvent('download'),
        await this.page.getByRole('link', { name: 'Download' }).click()
    ]);
    await expect(download).toBeTruthy();
    await expect(this.page).toHaveTitle(/Thank you for downloading/);
    await expect(this.page).toHaveURL(/thankyou-for-downloading/); 
  }

  async tryingDownloadWithoutLogin(){
    await this.page.getByRole('link', { name: 'Signup Free to download' }).click();
    const loginModal = this.page.locator('#authModal');
    await expect(loginModal).toBeVisible();
  }
}
