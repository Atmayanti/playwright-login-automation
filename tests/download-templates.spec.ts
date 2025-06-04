import { test, expect } from '@playwright/test';
import { TemplatesPage } from '../pages/templates-page';
import { loginPrecondition } from '../helpers/login-precondition';

test.describe('Download Template', () => {
  test.setTimeout(120000);

  test('D-01 User can access all pages', async ({ page }) => {
    const templatesPage = await loginPrecondition(page);
    await templatesPage.verifyAllPagesAreAccessible();
  });

  test('D-02 User download the Presentation Template', async ({ page }) => {
    const templatesPage = await loginPrecondition(page);
    await templatesPage.verifyAllPagesAreAccessible();
    await templatesPage.accessPresentationDetail();
    await templatesPage.downloadAfterLogin();
  });

  test('D-03 User try to download the Presentation Template without login', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goTo();
    await templatesPage.acceptCookies();
    await templatesPage.accessPresentationDetail();
    await templatesPage.tryingDownloadWithoutLogin();
  });
});
