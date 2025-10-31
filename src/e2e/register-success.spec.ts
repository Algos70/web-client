import { test } from "@playwright/test";
import {
  generateTestUser,
  registerNewUser,
  loginUser,
  verifyHomepageRedirect,
  navigateToCategories,
  selectFirstCategory,
  selectFirstProduct,
  addProductToCart,
  openProfileMenu,
  navigateToMyWallets,
  openCreateWalletModal,
  createWallet,
  verifyWalletExists,
  addFundsToWallet,
  navigateToCart,
  proceedToCheckout,
  placeOrder,
  verifyOrder,
  signOut,
} from "./utils/test-helpers";

test.describe("Complete E-commerce User Journey", () => {
  test("should complete full user journey from registration to order placement", async ({
    page,
  }) => {
    // Generate unique test data
    const testUser = generateTestUser();
    let productCurrency = "";

    // 1. Register a new user
    await registerNewUser(page, testUser);

    // 2. Login with registered credentials
    await loginUser(page, testUser.username, testUser.password);

    // 3. Verify redirect to homepage (/)
    await verifyHomepageRedirect(page);

    // 4. Click "View All Categories" and verify redirect to /categories
    await navigateToCategories(page);

    // 5. Click first category card and verify URL is /categories/[category-slug]
    await selectFirstCategory(page);

    // 6. Click first product card and verify URL is /product/[product-slug]
    await selectFirstProduct(page);

    // 7. Add product to cart and save currency code
    productCurrency = await addProductToCart(page);

    // 8. Click profile in header and verify profile menu opens
    await openProfileMenu(page);

    // 9. Click "My Wallets" and verify URL is /my-wallets
    await navigateToMyWallets(page);

    // 10. Click "Create New Wallet" and verify modal opens
    await openCreateWalletModal(page);

    // 11. Enter currency code and create wallet
    await createWallet(page, productCurrency);

    // 12. Verify wallet with our currency code is visible
    await verifyWalletExists(page, productCurrency);

    // 13. Click "Add Funds" and add 10000
    await addFundsToWallet(page, "10000");

    // 14. Click cart button and verify URL is /cart
    await navigateToCart(page);

    // 15. Click "Proceed to Checkout" and verify URL is /payment
    await proceedToCheckout(page);

    // 16. Click "Place Order" and verify success message
    await placeOrder(page);

    // 17. Go to My Orders and verify order was created
    await verifyOrder(page);

    // 18. Sign out
    await signOut(page);
  });
});
