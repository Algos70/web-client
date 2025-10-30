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
  query GetAdminProducts(
    $page: Int = 1
    $limit: Int = 10
    $search: String
    $categoryId: ID
    $inStockOnly: Boolean
  ) {
    adminProducts(
      page: $page
      limit: $limit
      search: $search
      categoryId: $categoryId
      inStockOnly: $inStockOnly
    ) {
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

// Public Product Queries
export const GET_PRODUCTS = gql`
  query GetProducts(
    $page: Int = 1
    $limit: Int = 10
    $search: String
    $categoryId: ID
    $inStockOnly: Boolean = true
  ) {
    products(
      page: $page
      limit: $limit
      search: $search
      categoryId: $categoryId
      inStockOnly: $inStockOnly
    ) {
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

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
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

export const GET_PRODUCT_AVAILABILITY = gql`
  query GetProductAvailability($id: ID!, $qty: Int = 1) {
    productAvailability(id: $id, qty: $qty) {
      productId
      available
      requiredQty
      stockQty
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts($limit: Int = 8) {
    featuredProducts(limit: $limit) {
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

export const SEARCH_PRODUCTS = gql`
  query SearchProducts(
    $search: String
    $categoryId: ID
    $inStockOnly: Boolean = true
    $page: Int = 1
    $limit: Int = 10
  ) {
    searchProducts(
      search: $search
      categoryId: $categoryId
      inStockOnly: $inStockOnly
      page: $page
      limit: $limit
    ) {
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

// Public Category Queries
export const GET_CATEGORIES = gql`
  query GetCategories($page: Int = 1, $limit: Int = 10, $search: String) {
    categories(page: $page, limit: $limit, search: $search) {
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

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
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

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    categoryBySlug(slug: $slug) {
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

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts(
    $slug: String!
    $page: Int = 1
    $limit: Int = 10
    $inStockOnly: Boolean = true
  ) {
    categoryProducts(
      slug: $slug
      page: $page
      limit: $limit
      inStockOnly: $inStockOnly
    ) {
      category {
        id
        slug
        name
        createdAt
        updatedAt
      }
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

// Cart Queries
export const GET_USER_CART = gql`
  query GetUserCart {
    userCart {
      id
      items {
        id
        qty
        createdAt
        updatedAt
        product {
          id
          name
          slug
          priceMinor
          currency
          stockQty
          category {
            id
            name
            slug
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

// Wallet Queries
export const GET_USER_WALLETS = gql`
  query GetUserWallets {
    userWallets {
      id
      currency
      balanceMinor
      createdAt
      updatedAt
      user {
        id
        email
      }
    }
  }
`;

export const GET_USER_WALLET_BY_CURRENCY = gql`
  query GetUserWalletByCurrency($currency: String!) {
    userWalletByCurrency(currency: $currency) {
      id
      currency
      balanceMinor
      createdAt
      updatedAt
      user {
        id
        email
      }
    }
  }
`;

export const GET_USER_WALLET_BALANCE = gql`
  query GetUserWalletBalance($currency: String!) {
    userWalletBalance(currency: $currency) {
      balance
      currency
      userId
    }
  }
`;

// TODO: Add other queries when schemas are provided
// - User queries
// - Order queries
