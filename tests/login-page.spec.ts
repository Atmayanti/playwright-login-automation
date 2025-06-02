// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TemplatesPage } from '../pages/templates-page';
import { loginTestData } from '../tests/fixtures/login-data';

test.describe('Login Scenarios', () => {
  test.setTimeout(1200000);
  for (const data of loginTestData) {
    test(`${data.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const templatesPage = new TemplatesPage(page);

      await templatesPage.goTo();
      await loginPage.acceptCookies();
      await loginPage.clickLoginButton();
      await loginPage.login(data.email, data.password);

      if (data.isValid) {
        await templatesPage.verifyProfileVisible();
      } else {
        await templatesPage.verifyErrorMessageVisible();
      }
    });
  }
});
