// GraphQL Types for TypeScript based on backend schema
export interface Category {
  id: string;
  slug: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  priceMinor: number;
  currency: string;
  stockQty: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CategoryConnection {
  categories: Category[];
  pagination: Pagination;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthUser {
  sub: string;
  email: string;
  preferred_username: string;
  name: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
  permissions: string[];
  dbUserId: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Auth Input Types
export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface Order {
  id: string;
  totalMinor: string;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product: Product;
  qty: number;
  unitPriceMinor: string;
  currency: string;
}

export interface Cart {
  id: string;
  user?: User;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cart: Cart;
  product: Product;
  qty: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartListResult {
  data: Cart[];
  pagination: Pagination;
}

export interface CartStats {
  totalCarts: number;
  activeCarts: number;
  emptyCarts: number;
}

// Input types for Category operations
export interface CreateCategoryInput {
  slug: string;
  name: string;
}

export interface UpdateCategoryInput {
  slug?: string;
  name?: string;
}

// Input types for Product operations
export interface CreateProductInput {
  name: string;
  slug: string;
  priceMinor: number;
  currency: string;
  stockQty: number;
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  priceMinor?: number;
  currency?: string;
  stockQty?: number;
  categoryId?: string;
}

export interface StockOperationInput {
  qty: number;
}

export interface PriceUpdateInput {
  priceMinor: number;
}

export interface ProductConnection {
  success: boolean;
  message: string;
  products: Product[];
  pagination: Pagination;
}

export interface StockCheckResult {
  inStock: boolean;
  requiredQty: number;
}

export interface ProductAvailability {
  productId: string;
  available: boolean;
  requiredQty: number;
  stockQty: number;
}

// New type for category products result
export interface CategoryProductsResult {
  category: Category;
  products: Product[];
  pagination: Pagination;
}

export interface ProductResult {
    success: boolean;
    message: string;
    product: Product;
  }

// Cart input types
export interface CreateCartInput {
  userId: string;
}

export interface AddCartItemInput {
  cartId: string;
  productId: string;
  qty: number;
}

export interface AddItemToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  qty: number;
}

export interface UpdateItemQuantityInput {
  productId: string;
  quantity: number;
}

export interface DecreaseItemQuantityInput {
  productId: string;
  decreaseBy?: number;
}

// Wallet Types
export interface Wallet {
  id: string;
  currency: string;
  balanceMinor: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface WalletConnection {
  wallets: Wallet[];
  pagination: Pagination;
}

export interface BalanceResponse {
  balanceMinor: string;
  currency: string;
  userId: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
}

// Wallet Input Types
export interface CreateWalletInput {
  userId: string;
  currency: string;
  initialBalanceMinor?: string;
}

export interface BalanceOperationInput {
  amountMinor: string;
}

export interface TransferInput {
  fromUserId: string;
  toUserId: string;
  currency: string;
  amountMinor: string;
}

export interface CreateUserWalletInput {
  currency: string;
  initialBalanceMinor?: string;
}

export interface UserTransferInput {
  toWalletId: string;
  currency: string;
  amountMinor: string;
}

// Order Input Types
export interface CreateOrderItemForOrderInput {
  productId: string;
  qty: number;
  unitPriceMinor: string;
  currency: string;
}
export interface CreateOrderFromCartInput {
  walletId: string;
}

export interface CreateOrderInput {
  userId: string;
  totalMinor: number;
  currency: string;
  status?: string;
  items: CreateOrderItemForOrderInput[];
}

export interface UpdateOrderInput {
  totalMinor?: number;
  currency?: string;
  status?: string;
}

export interface UpdateOrderStatusInput {
  status: string;
}

export interface OrderConnection {
  orders: Order[];
  pagination: Pagination;
}