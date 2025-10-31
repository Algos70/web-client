import { Page, expect } from '@playwright/test';

export interface TestUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export function generateTestUser(): TestUser {
  const timestamp = Date.now();
  return {
    firstName: "Test",
    lastName: "User",
    username: `testuser${timestamp}`,
    email: `test${timestamp}@example.com`,
    password: "TestPassword123!",
  };
}

export async function registerNewUser(page: Page, testUser: TestUser) {
  await page.goto("/register");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveTitle(/Kayıt Ol/);
  await expect(page.locator("h1")).toContainText("Join NoxCommerce");

  await page.fill("#firstName", testUser.firstName);
  await page.fill("#lastName", testUser.lastName);
  await page.fill("#username", testUser.username);
  await page.fill("#email", testUser.email);
  await page.fill("#password", testUser.password);
  await page.fill("#confirmPassword", testUser.password);

  await page.click('button[type="submit"]');

  expect(page.locator("#register-success"));
  await page.waitForURL("**/login", { timeout: 5000 });
}

export async function loginUser(page: Page, username: string, password: string) {
  await page.fill("#username", username);
  await page.fill("#password", password);
  await page.click('button[type="submit"]');
}

export async function verifyHomepageRedirect(page: Page) {
  await page.waitForURL("/", { timeout: 5000 });
  await expect(page).toHaveURL("/");
}

export async function navigateToCategories(page: Page) {
  await page.click("#view-all-categories");
  await page.waitForURL("/categories", { timeout: 5000 });
  await expect(page).toHaveURL("/categories");
}

export async function selectFirstCategory(page: Page): Promise<string> {
  const firstCategory = page.locator('[id^="category-"]').first();
  await firstCategory.click();
  const idValue = await firstCategory.getAttribute("id");
  if (idValue !== null) {
    const slug = idValue.replace("category-", "");
    await page.waitForURL(`/categories/${slug}`, { timeout: 5000 });
    expect(page.url()).toContain(`/categories/${slug}`);
    return slug;
  }
  throw new Error("Category ID not found");
}

export async function selectFirstProduct(page: Page): Promise<string> {
  await page.waitForSelector('[id^="product-"]', {
    timeout: 10000,
  });
  const firstProductCard = page.locator('[id^="product-"]').first();
  await firstProductCard.click();
  const idValueProduct = await firstProductCard.getAttribute("id");
  if (idValueProduct !== null) {
    const productSlug = idValueProduct.replace("product-", "");
    await page.waitForURL(`/product/${productSlug}`, { timeout: 5000 });
    expect(page.url()).toContain(`/product/${productSlug}`);
    return productSlug;
  }
  throw new Error("Product ID not found");
}

export async function addProductToCart(page: Page): Promise<string> {
  await page.waitForLoadState("networkidle");
  const priceElement = page.locator(".price");
  const productCurrency = (await priceElement.getAttribute("id")) || "";

  await page.click('[id^="add-to-cart-"]');
  await expect(
    page.locator("text=Product added to cart successfully!")
  ).toBeVisible({ timeout: 5000 });

  return productCurrency;
}

export async function openProfileMenu(page: Page) {
  await page.click('.profile-button');
  await expect(page.locator('.profile-menu')).toBeVisible();
}

export async function navigateToMyWallets(page: Page) {
  await page.click("#my-wallets");
  await page.waitForURL("/my-wallets", { timeout: 5000 });
  await expect(page).toHaveURL("/my-wallets");
}

export async function openCreateWalletModal(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('#create-new-wallet', {
    timeout: 10000,
  });
  await page.click('#create-new-wallet');
  await expect(page.locator("#create-wallet-modal")).toBeVisible();
}

export async function createWallet(page: Page, currency: string) {
  await page.fill("#currency-input", currency);
  await page.click('#create-wallet');
  await expect(page.locator("text=Wallet created successfully!")).toBeVisible(
    { timeout: 5000 }
  );
}

export async function verifyWalletExists(page: Page, currency: string) {
  await expect(page.locator(`#wallet-${currency}`)).toBeVisible();
}

export async function addFundsToWallet(page: Page, amount: string) {
  await page.click(`#add-funds-start`);
  await expect(page.locator("#add-funds-modal")).toBeVisible();

  await page.fill("#amount-input", amount);
  await page.click('#add-funds-button');
  await expect(page.locator("text=Funds added successfully!")).toBeVisible({
    timeout: 5000,
  });
}

export async function navigateToCart(page: Page) {
  await page.click("#cart-button");
  await page.waitForURL("/cart", { timeout: 5000 });
  await expect(page).toHaveURL("/cart");
}

export async function proceedToCheckout(page: Page) {
  await page.click("#checkout-button");
  await page.waitForURL("/payment", { timeout: 5000 });
  await expect(page).toHaveURL("/payment");
}

export async function placeOrder(page: Page) {
  await page.click("#order-button");
  await expect(page.locator("text=Order placed successfully!")).toBeVisible({
    timeout: 10000,
  });
}

export async function navigateToMyOrders(page: Page) {
  await page.click("#my-orders");
  await page.waitForURL("/my-orders", { timeout: 5000 });
  await expect(page).toHaveURL("/my-orders");
}

export async function verifyOrderExists(page: Page, expectedCount: number = 1) {
  const orderItems = page.locator('[id^="order-"]');
  await expect(orderItems).toHaveCount(expectedCount);
}

export async function verifyOrder(page: Page) {
    await openProfileMenu(page);
    await navigateToMyOrders(page);
    await verifyOrderExists(page, 1);
}

export async function signOut(page: Page) {
  await openProfileMenu(page);
  await page.click("#signout");
  await page.waitForURL("/login", { timeout: 5000});
  await expect(page).toHaveURL("/login");
}