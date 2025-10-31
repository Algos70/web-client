import { Page, expect } from '@playwright/test';

export async function openProfileMenu(page: Page) {
  await page.click('.profile-button');
  await expect(page.locator('.profile-menu')).toBeVisible();
}