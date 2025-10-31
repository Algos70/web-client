import { test, expect } from "@playwright/test";
import { openProfileMenu } from "./utils/test-helpers";

test.describe("Complete E-commerce User Journey", () => {
  test("should complete full user journey from registration to order placement", async ({
    page,
  }) => {
    // Generate unique test data
    const timestamp = Date.now();
    const testUser = {
      firstName: "Test",
      lastName: "User",
      username: `testuser${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: "TestPassword123!",
    };

    let productCurrency = "";

    // 1. Register a new user
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

    // 2. Login with registered credentials
    await page.fill("#username", testUser.username);
    await page.fill("#password", testUser.password);
    await page.click('button[type="submit"]');

    // 3. Verify redirect to homepage (/)
    await page.waitForURL("/", { timeout: 5000 });
    await expect(page).toHaveURL("/");

    // 4. Click "View All Categories" and verify redirect to /categories
    await page.click("#view-all-categories");
    await page.waitForURL("/categories", { timeout: 5000 });
    await expect(page).toHaveURL("/categories");

    // 5. Click first category card and verify URL is /categories/[category-slug]
    const firstCategory = page.locator('[id^="category-"]').first();
    await firstCategory.click();
    const idValue = await firstCategory.getAttribute("id");
    if (idValue !== null) {
      const slug = idValue.replace("category-", "");
      await page.waitForURL(`/categories/${slug}`, { timeout: 5000 });
      expect(page.url()).toContain(`/categories/${slug}`);
    }

    // 6. Click first product card and verify URL is /product/[product-slug]
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
    }
    // 7. Add product to cart and save currency code
    await page.waitForLoadState("networkidle");
    const priceElement = page.locator(".price");
    productCurrency = (await priceElement.getAttribute("id")) || "";

    await page.click('[id^="add-to-cart-"]');
    await expect(
      page.locator("text=Product added to cart successfully!")
    ).toBeVisible({ timeout: 5000 });

    // 8. Click profile in header and verify profile menu opens
    await openProfileMenu(page);

    // 9. Click "My Wallets" and verify URL is /my-wallets
    await page.click("#my-wallets");
    await page.waitForURL("/my-wallets", { timeout: 5000 });
    await expect(page).toHaveURL("/my-wallets");

    // 10. Click "Create New Wallet" and verify modal opens
    await page.waitForLoadState("networkidle");
    await page.waitForSelector('#create-new-wallet', {
      timeout: 10000,
    });
    await page.click('#create-new-wallet');
    await expect(page.locator("#create-wallet-modal")).toBeVisible();

    // 11. Enter currency code and create wallet
    await page.fill("#currency-input", productCurrency);
    await page.click('#create-wallet');
    await expect(page.locator("text=Wallet created successfully!")).toBeVisible(
      { timeout: 5000 }
    );

    // 12. Verify wallet with our currency code is visible
    await expect(page.locator(`#wallet-${productCurrency}`)).toBeVisible();

    // 13. Click "Add Funds" and add 10000
    await page.click(`#add-funds-start`);
    await expect(page.locator("#add-funds-modal")).toBeVisible();

    await page.fill("#amount-input", "10000");
    await page.click('#add-funds-button');
    await expect(page.locator("text=Funds added successfully!")).toBeVisible({
      timeout: 5000,
    });

    // 14. Click cart button and verify URL is /cart
    await page.click("#cart-button");
    await page.waitForURL("/cart", { timeout: 5000 });
    await expect(page).toHaveURL("/cart");

    // 15. Click "Proceed to Checkout" and verify URL is /payment
    await page.click("#checkout-button");
    await page.waitForURL("/payment", { timeout: 5000 });
    await expect(page).toHaveURL("/payment");

    // 16. Click "Place Order" and verify success message
    await page.click("#order-button");
    await expect(page.locator("text=Order placed successfully!")).toBeVisible({
      timeout: 10000,
    });

    // 17. Go to My Orders and verify order was created
    await openProfileMenu(page);

    await page.click("#my-orders");
    await page.waitForURL("/my-orders", { timeout: 5000 });
    await expect(page).toHaveURL("/my-orders");

    // Verify our order exists (should have exactly one order)
    const orderItems = page.locator('[id^="order-"]');
    await expect(orderItems).toHaveCount(1);

    // 18. signout
    await openProfileMenu(page);
    await page.click("#signout");
    await page.waitForURL("/login", { timeout: 5000})
    await expect(page).toHaveURL("/login");


  });
});
