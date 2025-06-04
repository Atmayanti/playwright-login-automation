import { LoginPage } from '../pages/login-page';
import { TemplatesPage } from '../pages/templates-page';
import { loginTestData } from '../tests/fixtures/login-data';

export async function loginPrecondition(page) {
  const loginPage = new LoginPage(page);
  const templatesPage = new TemplatesPage(page);
  const { email, password } = loginTestData[0];

  await templatesPage.goTo();
  await templatesPage.acceptCookies();
  await loginPage.clickLoginModal();
  await loginPage.login(email, password);

  return templatesPage; 
}
