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
} from "./mutations";
import type { 
  Category, 
  CategoryConnection, 
  CreateCategoryInput, 
  UpdateCategoryInput,
  Product,
  ProductConnection,
  CreateProductInput,
  UpdateProductInput,
  StockOperationInput,
  PriceUpdateInput,
  StockCheckResult
} from "./types";

// Custom hooks for Category queries
export const useAdminCategories = (page: number = 1, limit: number = 10, search?: string) => {
  return useQuery<{ adminCategories: CategoryConnection }>(GET_ADMIN_CATEGORIES, {
    variables: { page, limit, search },
  });
};

export const useAdminCategory = (id: string) => {
  return useQuery<{ adminCategory: Category }>(GET_ADMIN_CATEGORY, {
    variables: { id },
    skip: !id,
  });
};

export const useAdminCategoryBySlug = (slug: string) => {
  return useQuery<{ adminCategoryBySlug: Category }>(GET_ADMIN_CATEGORY_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });
};

// Custom hooks for Category mutations
export const useCreateCategory = () => {
  return useMutation<{ adminCreateCategory: Category }, { input: CreateCategoryInput }>(CREATE_CATEGORY);
};

export const useUpdateCategory = () => {
  return useMutation<{ adminUpdateCategory: Category }, { id: string; input: UpdateCategoryInput }>(UPDATE_CATEGORY);
};

export const useDeleteCategory = () => {
  return useMutation<{ adminDeleteCategory: boolean }, { id: string }>(DELETE_CATEGORY);
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
  return useQuery<{ adminProductBySlug: Product }>(GET_ADMIN_PRODUCT_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });
};

export const useAdminProductsByCategory = (categoryId: string) => {
  return useQuery<{ adminProductsByCategory: Product[] }>(GET_ADMIN_PRODUCTS_BY_CATEGORY, {
    variables: { categoryId },
    skip: !categoryId,
  });
};

export const useAdminProductStockCheck = (id: string, qty: number = 1) => {
  return useQuery<{ adminProductStockCheck: StockCheckResult }>(GET_ADMIN_PRODUCT_STOCK_CHECK, {
    variables: { id, qty },
    skip: !id,
  });
};

// Custom hooks for Product mutations
export const useCreateProduct = () => {
  return useMutation<{ adminCreateProduct: Product }, { input: CreateProductInput }>(CREATE_PRODUCT);
};

export const useUpdateProduct = () => {
  return useMutation<{ adminUpdateProduct: Product }, { id: string; input: UpdateProductInput }>(UPDATE_PRODUCT);
};

export const useDeleteProduct = () => {
  return useMutation<{ adminDeleteProduct: boolean }, { id: string }>(DELETE_PRODUCT);
};

export const useIncreaseProductStock = () => {
  return useMutation<{ adminIncreaseProductStock: Product }, { id: string; input: StockOperationInput }>(INCREASE_PRODUCT_STOCK);
};

export const useDecreaseProductStock = () => {
  return useMutation<{ adminDecreaseProductStock: Product }, { id: string; input: StockOperationInput }>(DECREASE_PRODUCT_STOCK);
};

export const useUpdateProductPrice = () => {
  return useMutation<{ adminUpdateProductPrice: Product }, { id: string; input: PriceUpdateInput }>(UPDATE_PRODUCT_PRICE);
};
