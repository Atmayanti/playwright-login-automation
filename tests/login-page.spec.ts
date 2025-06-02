// tests/login.spec.ts
import { test, expect } from '@playwright/test';
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
      await loginPage.clickLoginModal();
      await loginPage.login(data.email, data.password);

      // if (data.isValid) {
      //   await expect(page.getByRole('link', { name: 'MY PROFILE' }))
      //     .toBeVisible({ timeout: 10000 });
      // } else {
      //   try {
      //     await loginPage.expectErrorMessage(data.expectedError);
      //   } catch {
      //     throw new Error(`❌ Expected error message "${data.expectedError}" not found.`);
      //   }
      // }

      if (data.isValid) {
        await templatesPage.verifyProfileVisible();
      } else {
        if (!data.expectedError) {
          throw new Error('Expected error message is missing in test data');
        }
        await loginPage.expectValidationMessage(data.expectedError);
      }
    });
  }
});
