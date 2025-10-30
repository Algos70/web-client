import { gql } from "@apollo/client";

// Category Queries
export const GET_ADMIN_CATEGORIES = gql`
  query GetAdminCategories($page: Int = 1, $limit: Int = 10, $search: String) {
    adminCategories(page: $page, limit: $limit, search: $search) {
      categories {
        id
        slug
        name
        createdAt
        updatedAt
        products {
          id
          name
        }
      }
      pagination {
        page
        limit
        total
        totalPages
      }
    }
  }
`;

export const GET_ADMIN_CATEGORY = gql`
  query GetAdminCategory($id: ID!) {
    adminCategory(id: $id) {
      id
      slug
      name
      createdAt
      updatedAt
      products {
        id
        name
      }
    }
  }
`;

export const GET_ADMIN_CATEGORY_BY_SLUG = gql`
  query GetAdminCategoryBySlug($slug: String!) {
    adminCategoryBySlug(slug: $slug) {
      id
      slug
      name
      createdAt
      updatedAt
      products {
        id
        name
      }
    }
  }
`;

// Product Queries
export const GET_ADMIN_PRODUCTS = gql`
  query GetAdminProducts($page: Int = 1, $limit: Int = 10, $search: String, $categoryId: ID, $inStockOnly: Boolean) {
    adminProducts(page: $page, limit: $limit, search: $search, categoryId: $categoryId, inStockOnly: $inStockOnly) {
      products {
        id
        name
        slug
        priceMinor
        currency
        stockQty
        createdAt
        updatedAt
        category {
          id
          name
          slug
        }
      }
      pagination {
        page
        limit
        total
        totalPages
      }
    }
  }
`;

export const GET_ADMIN_PRODUCT = gql`
  query GetAdminProduct($id: ID!) {
    adminProduct(id: $id) {
      id
      name
      slug
      priceMinor
      currency
      stockQty
      createdAt
      updatedAt
      category {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ADMIN_PRODUCT_BY_SLUG = gql`
  query GetAdminProductBySlug($slug: String!) {
    adminProductBySlug(slug: $slug) {
      id
      name
      slug
      priceMinor
      currency
      stockQty
      createdAt
      updatedAt
      category {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ADMIN_PRODUCTS_BY_CATEGORY = gql`
  query GetAdminProductsByCategory($categoryId: ID!) {
    adminProductsByCategory(categoryId: $categoryId) {
      id
      name
      slug
      priceMinor
      currency
      stockQty
      createdAt
      updatedAt
      category {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ADMIN_PRODUCT_STOCK_CHECK = gql`
  query GetAdminProductStockCheck($id: ID!, $qty: Int = 1) {
    adminProductStockCheck(id: $id, qty: $qty) {
      inStock
      requiredQty
    }
  }
`;

// TODO: Add other queries when schemas are provided
// - User queries  
// - Order queries
// - Cart queries
// - Wallet queries