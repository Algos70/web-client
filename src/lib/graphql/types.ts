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
  // Add other product fields when you share Product schema
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
  name: string;
  email: string;
  orders?: Order[];
}

export interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
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