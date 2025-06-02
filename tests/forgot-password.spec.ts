import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TemplatesPage } from '../pages/templates-page';
import { resetPasswordData } from '../tests/fixtures/reset-password-data';

test.describe('Forgot Password Scenarios', () => {
  test.setTimeout(120000);

  for (const data of resetPasswordData) {
    test(`${data.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const templatesPage = new TemplatesPage(page);

      await templatesPage.goTo();
      await loginPage.acceptCookies();
      await loginPage.clickLoginModal();
      await loginPage.clickForgotPassword();
      await loginPage.resetPassword(data.email);

      if (data.isValid) {
        await loginPage.verifyResetPasswordEmailSent();
      } else {
        if (!data.expectedError) {
          throw new Error('Expected error message is missing in test data');
        }
        await loginPage.expectValidationMessage(data.expectedError);
      }

    });
  }
});

