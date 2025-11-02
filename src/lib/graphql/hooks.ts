import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_ADMIN_CATEGORIES,
  GET_ADMIN_CATEGORY,
  GET_ADMIN_CATEGORY_BY_SLUG,
  GET_ADMIN_PRODUCTS,
  GET_ADMIN_PRODUCT,
  GET_ADMIN_PRODUCT_BY_SLUG,
  GET_ADMIN_PRODUCTS_BY_CATEGORY,
  GET_ADMIN_PRODUCT_STOCK_CHECK,
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS_BY_CATEGORY,
  GET_FEATURED_PRODUCTS,
  SEARCH_PRODUCTS,
  GET_USER_CART,
  GET_USER_WALLETS,
  GET_USER_WALLET_BY_CURRENCY,
  GET_USER_WALLET_BALANCE,
  GET_USER_ORDERS,
  GET_USER_ORDER,
  GET_ME,
} from "./queries";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  INCREASE_PRODUCT_STOCK,
  DECREASE_PRODUCT_STOCK,
  UPDATE_PRODUCT_PRICE,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
  UPDATE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  CREATE_USER_WALLET,
  INCREASE_USER_WALLET_BALANCE,
  DELETE_USER_WALLET,
  TRANSFER_FROM_USER_WALLET,
  CREATE_ORDER_FROM_CART,
  LOGIN,
  REGISTER,
  LOGOUT,
  REFRESH_TOKEN,
} from "./mutations";
import type {
  Category,
  CategoryConnection,
  CreateCategoryInput,
  UpdateCategoryInput,
  Product,
  ProductConnection,
  ProductResult,
  ProductsResult,
  UserWalletsResult,
  CreateProductInput,
  UpdateProductInput,
  StockOperationInput,
  PriceUpdateInput,
  StockCheckResult,
  Cart,
  AddItemToCartInput,
  UpdateItemQuantityInput,
  DecreaseItemQuantityInput,
  Wallet,
  BalanceResponse,
  TransferResponse,
  UserWalletResult,
  UserWalletBalanceResult,
  UserWalletOperationResult,
  CreateUserWalletInput,
  BalanceOperationInput,
  UserTransferInput,
  Order,
  CreateOrderFromCartInput,
  AuthUser,
  AuthResponse,
  RegisterResponse,
  LogoutResponse,
  LoginInput,
  RegisterInput,
} from "./types";

// Custom hooks for Category queries
export const useAdminCategories = (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  return useQuery<{ adminCategories: CategoryConnection }>(
    GET_ADMIN_CATEGORIES,
    {
      variables: { page, limit, search },
    }
  );
};

export const useAdminCategory = (id: string) => {
  return useQuery<{ adminCategory: Category }>(GET_ADMIN_CATEGORY, {
    variables: { id },
    skip: !id,
  });
};

export const useAdminCategoryBySlug = (slug: string) => {
  return useQuery<{ adminCategoryBySlug: Category }>(
    GET_ADMIN_CATEGORY_BY_SLUG,
    {
      variables: { slug },
      skip: !slug,
    }
  );
};

// Custom hooks for Category mutations
export const useCreateCategory = () => {
  return useMutation<
    { adminCreateCategory: Category },
    { input: CreateCategoryInput }
  >(CREATE_CATEGORY);
};

export const useUpdateCategory = () => {
  return useMutation<
    { adminUpdateCategory: Category },
    { id: string; input: UpdateCategoryInput }
  >(UPDATE_CATEGORY);
};

export const useDeleteCategory = () => {
  return useMutation<{ adminDeleteCategory: boolean }, { id: string }>(
    DELETE_CATEGORY
  );
};

// Custom hooks for Product queries
export const useAdminProducts = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  categoryId?: string,
  inStockOnly?: boolean
) => {
  return useQuery<{ adminProducts: ProductConnection }>(GET_ADMIN_PRODUCTS, {
    variables: { page, limit, search, categoryId, inStockOnly },
  });
};

export const useAdminProduct = (id: string) => {
  return useQuery<{ adminProduct: Product }>(GET_ADMIN_PRODUCT, {
    variables: { id },
    skip: !id,
  });
};

export const useAdminProductBySlug = (slug: string) => {
  return useQuery<{ adminProductBySlug: ProductResult }>(
    GET_ADMIN_PRODUCT_BY_SLUG,
    {
      variables: { slug },
      skip: !slug,
    }
  );
};

export const useAdminProductsByCategory = (categoryId: string) => {
  return useQuery<{ adminProductsByCategory: ProductsResult }>(
    GET_ADMIN_PRODUCTS_BY_CATEGORY,
    {
      variables: { categoryId },
      skip: !categoryId,
    }
  );
};

export const useAdminProductStockCheck = (id: string, qty: number = 1) => {
  return useQuery<{ adminProductStockCheck: StockCheckResult }>(
    GET_ADMIN_PRODUCT_STOCK_CHECK,
    {
      variables: { id, qty },
      skip: !id,
    }
  );
};

// Custom hooks for Product mutations
export const useCreateProduct = () => {
  return useMutation<
    { adminCreateProduct: Product },
    { input: CreateProductInput }
  >(CREATE_PRODUCT);
};

export const useUpdateProduct = () => {
  return useMutation<
    { adminUpdateProduct: Product },
    { id: string; input: UpdateProductInput }
  >(UPDATE_PRODUCT);
};

export const useDeleteProduct = () => {
  return useMutation<{ adminDeleteProduct: boolean }, { id: string }>(
    DELETE_PRODUCT
  );
};

export const useIncreaseProductStock = () => {
  return useMutation<
    { adminIncreaseProductStock: Product },
    { id: string; input: StockOperationInput }
  >(INCREASE_PRODUCT_STOCK);
};

export const useDecreaseProductStock = () => {
  return useMutation<
    { adminDecreaseProductStock: Product },
    { id: string; input: StockOperationInput }
  >(DECREASE_PRODUCT_STOCK);
};

export const useUpdateProductPrice = () => {
  return useMutation<
    { adminUpdateProductPrice: Product },
    { id: string; input: PriceUpdateInput }
  >(UPDATE_PRODUCT_PRICE);
};

// Public Product hooks
export const useProducts = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  categoryId?: string,
  inStockOnly: boolean = true
) => {
  return useQuery<{ products: ProductConnection }>(GET_PRODUCTS, {
    variables: { page, limit, search, categoryId, inStockOnly },
  });
};

export const useProduct = (id: string) => {
  return useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id },
    skip: !id,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery<{ productBySlug: ProductResult }>(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });
};

export const useProductsByCategory = (categoryId: string) => {
  return useQuery<{ productsByCategory: ProductsResult }>(
    GET_PRODUCTS_BY_CATEGORY,
    {
      variables: { categoryId },
      skip: !categoryId,
    }
  );
};

export const useFeaturedProducts = (
  limit: number = 8,
  options?: { skip?: boolean }
) => {
  return useQuery<{ featuredProducts: ProductConnection }>(
    GET_FEATURED_PRODUCTS,
    {
      variables: { limit },
      skip: options?.skip,
    }
  );
};

export const useSearchProducts = (
  search?: string,
  categoryId?: string,
  inStockOnly: boolean = true,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery<{ searchProducts: ProductConnection }>(SEARCH_PRODUCTS, {
    variables: { search, categoryId, inStockOnly, page, limit },
  });
};

// Cart hooks
export const useUserCart = () => {
  return useQuery<{ userCart: Cart }>(GET_USER_CART);
};

export const useAddItemToCart = () => {
  return useMutation<{ addItemToCart: Cart }, { input: AddItemToCartInput }>(
    ADD_ITEM_TO_CART,
    {
      refetchQueries: [{ query: GET_USER_CART }],
    }
  );
};

export const useRemoveItemFromCart = () => {
  return useMutation<{ removeItemFromCart: Cart }, { productId: string }>(
    REMOVE_ITEM_FROM_CART,
    {
      refetchQueries: [{ query: GET_USER_CART }],
    }
  );
};

export const useClearCart = () => {
  return useMutation<{ clearCart: Cart }>(CLEAR_CART, {
    refetchQueries: [{ query: GET_USER_CART }],
  });
};

export const useUpdateItemQuantity = () => {
  return useMutation<
    { updateItemQuantity: Cart },
    { input: UpdateItemQuantityInput }
  >(UPDATE_ITEM_QUANTITY, {
    refetchQueries: [{ query: GET_USER_CART }],
  });
};

export const useDecreaseItemQuantity = () => {
  return useMutation<
    { decreaseItemQuantity: Cart },
    { input: DecreaseItemQuantityInput }
  >(DECREASE_ITEM_QUANTITY, {
    refetchQueries: [{ query: GET_USER_CART }],
  });
};

// Wallet hooks
export const useUserWallets = () => {
  return useQuery<{ userWallets: UserWalletsResult }>(GET_USER_WALLETS);
};

export const useUserWalletByCurrency = (currency: string) => {
  return useQuery<{ userWalletByCurrency: UserWalletResult }>(
    GET_USER_WALLET_BY_CURRENCY,
    {
      variables: { currency },
      skip: !currency,
    }
  );
};

export const useUserWalletBalance = (currency: string) => {
  return useQuery<{ userWalletBalance: UserWalletBalanceResult }>(
    GET_USER_WALLET_BALANCE,
    {
      variables: { currency },
      skip: !currency,
    }
  );
};

export const useCreateUserWallet = () => {
  return useMutation<
    { createUserWallet: UserWalletResult },
    { input: CreateUserWalletInput }
  >(CREATE_USER_WALLET, {
    refetchQueries: [{ query: GET_USER_WALLETS }],
  });
};

export const useIncreaseUserWalletBalance = () => {
  return useMutation<
    { increaseUserWalletBalance: UserWalletOperationResult },
    { walletId: string; input: BalanceOperationInput }
  >(INCREASE_USER_WALLET_BALANCE, {
    refetchQueries: [{ query: GET_USER_WALLETS }],
  });
};

export const useDeleteUserWallet = () => {
  return useMutation<{ deleteUserWallet: boolean }, { walletId: string }>(
    DELETE_USER_WALLET,
    {
      refetchQueries: [{ query: GET_USER_WALLETS }],
    }
  );
};

export const useTransferFromUserWallet = () => {
  return useMutation<
    { transferFromUserWallet: TransferResponse },
    { input: UserTransferInput }
  >(TRANSFER_FROM_USER_WALLET, {
    refetchQueries: [{ query: GET_USER_WALLETS }],
  });
};
// Order hooks
export const useUserOrders = () => {
  return useQuery<{ userOrders: Order[] }>(GET_USER_ORDERS);
};

export const useUserOrder = (id: string) => {
  return useQuery<{ userOrder: Order }>(GET_USER_ORDER, {
    variables: { id },
    skip: !id,
  });
};

export const useCreateOrderFromCart = () => {
  return useMutation<
    { createOrderFromCart: Order },
    { input: CreateOrderFromCartInput }
  >(CREATE_ORDER_FROM_CART, {
    refetchQueries: [{ query: GET_USER_CART }, { query: GET_USER_ORDERS }],
  });
};

// Authentication hooks
export const useMe = () => {
  return useQuery<{ me: AuthUser }>(GET_ME, {
    errorPolicy: "ignore", // Ignore 401 errors for unauthenticated users
  });
};

export const useLogin = () => {
  return useMutation<{ login: AuthResponse }, { input: LoginInput }>(LOGIN);
};

export const useRegister = () => {
  return useMutation<{ register: RegisterResponse }, { input: RegisterInput }>(
    REGISTER
  );
};

export const useLogout = () => {
  return useMutation<{ logout: LogoutResponse }>(LOGOUT);
};

export const useRefreshToken = () => {
  return useMutation<{ refreshToken: AuthResponse }>(REFRESH_TOKEN);
};
