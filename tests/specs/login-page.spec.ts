// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { TemplatesPage } from '../../pages/templates-page';
import { loginTestData } from '../fixtures/login-data';

test.describe('Login Scenarios', () => {
  test.setTimeout(1200000);
  for (const data of loginTestData) {
    test(`${data.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const templatesPage = new TemplatesPage(page);

      //before login step
      await templatesPage.goTo();
      await templatesPage.acceptCookies();
      await loginPage.clickLoginModal();
      await loginPage.login(data.email, data.password);

      //login validation
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
