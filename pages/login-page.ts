// pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async acceptCookies() {
    await this.page.getByRole('link', { name: 'I agree' }).click();
  }

  async clickLoginButton() {
    await this.page.getByRole('link', { name: 'LOGIN' }).click();
  }

  async login(email: string, password: string) {
    await this.page.locator('#loginEmail').fill(email);
    await this.page.locator('#loginPassword').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
