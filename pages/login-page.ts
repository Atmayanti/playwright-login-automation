// pages/LoginPage.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async acceptCookies() {
        await this.page.getByRole('link', { name: 'I agree' }).click();
    }

    async clickLoginModal() {
        await this.page.getByRole('link', { name: 'LOGIN' }).click();
    }

    async login(email: string, password: string) {
        await this.page.locator('#loginEmail').fill(email);
        await this.page.locator('#loginPassword').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async expectValidationMessage(expectedMsg: string) {
        const emailError = this.page.locator('.error-block.email');
        const passwordError = this.page.locator('.error-block.password');
        const emailNull = this.page.locator('#loginEmail');
        const passwordNull = this.page.locator('#loginPassword');

        // Check visibility of error messages
        const [emailVisible, passwordVisible] = await Promise.all([
            emailError.isVisible(),
            passwordError.isVisible(),
        ]);

        // If both errors are visible, check both
        if (emailVisible && passwordVisible) {
            await expect(emailError).toHaveText(expectedMsg, { timeout: 5000 });
            await expect(passwordError).toHaveText(expectedMsg, { timeout: 5000 });
        }
        // If only email error is visible
        else if (emailVisible) {
            await expect(emailError).toHaveText(expectedMsg, { timeout: 5000 });
        }
        // If only password error is visible
        else if (passwordVisible) {
            await expect(passwordError).toHaveText(expectedMsg, { timeout: 5000 });
        } else {
            throw new Error('No error message found on email or password field.');
        }

        // Also check the HTML5 native validation message on the input element
        const msgEmailNull = await emailNull.evaluate((el: HTMLInputElement) => el.validationMessage);
        const msgPasswordNull = await passwordNull.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(msgEmailNull).toBe(expectedMsg);
        expect(msgPasswordNull).toBe(expectedMsg);
    }

}
