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
        const emailInvalid = this.page.locator('.error-block.email');
        const passwordInvalid = this.page.locator('.error-block.password');
        const emailValidationField = this.page.locator('#loginEmail');
        const passwordValidationField = this.page.locator('#loginPassword');

        // Check visibility of error messages
        const [emailVisible, passwordVisible] = await Promise.all([
            emailInvalid.isVisible(),
            passwordInvalid.isVisible(),
        ]);

        // If both errors are visible, check both
        if (emailVisible && passwordVisible) {
            await expect(emailInvalid).toHaveText(expectedMsg, { timeout: 5000 });
            await expect(passwordInvalid).toHaveText(expectedMsg, { timeout: 5000 });
        }
        // If only email error is visible
        else if (emailVisible) {
            await expect(emailInvalid).toHaveText(expectedMsg, { timeout: 5000 });
        }
        // If only password error is visible
        else if (passwordVisible) {
            await expect(passwordInvalid).toHaveText(expectedMsg, { timeout: 5000 });
        } else {
            throw new Error('No error message found on email or password field.');
        }

        // Also check the HTML5 native validation message on the input element
        const msgEmail = await emailValidationField.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(msgEmail).toBe(expectedMsg);
        const msgPassword = await passwordValidationField.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(msgPassword).toBe(expectedMsg);
    }

    async clickForgotPassword() {
        await this.page.locator('#remindPassBtn').click();
    }

    async resetPassword(email: string) {
        await this.page.locator('#resetEmail').fill(email);
        await this.page.getByRole('button', { name: 'Send Request' }).click();
    }

    async assertResetResult(expectedMsg: string) {
        const emailInvalid = this.page.locator('.error-block.email');
        const emailValidationField = this.page.locator('#resetEmail');
        if (expectedMsg) {
            await expect(emailInvalid).toHaveText(expectedMsg, { timeout: 5000 });
        } else {
            throw new Error('Expected result message must be provided for invalid cases');
        }
        const msgEmail = await emailValidationField.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(msgEmail).toBe(expectedMsg);
    }

    async verifyResetPasswordEmailSent() {
        await expect(this.page.getByRole('link', { name: 'Go to login' })).toBeVisible({ timeout: 120000 });
    }
}
