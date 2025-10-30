// Base schema with Query and Mutation types
const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Pagination {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: ID!
    slug: String!
    name: String!
    createdAt: String!
    updatedAt: String!
    products: [Product!]
  }

  type CategoryConnection {
    categories: [Category!]!
    pagination: Pagination!
  }

  type CategoryProductsResult {
    category: Category!
    products: [Product!]!
    pagination: Pagination!
  }
`;

// GraphQL type definitions for Product
const productTypeDefs = `
  type Product {
    id: ID!
    name: String!
    slug: String!
    priceMinor: Int!
    currency: String!
    stockQty: Int!
    createdAt: String!
    updatedAt: String!
    category: Category!
  }

  input CreateProductInput {
    name: String!
    slug: String!
    priceMinor: Int!
    currency: String!
    stockQty: Int!
    categoryId: ID!
  }

  input UpdateProductInput {
    name: String
    slug: String
    priceMinor: Int
    currency: String
    stockQty: Int
    categoryId: ID
  }

  input StockOperationInput {
    qty: Int!
  }

  input PriceUpdateInput {
    priceMinor: Int!
  }

  type ProductConnection {
    products: [Product!]!
    pagination: Pagination!
  }

  type StockCheckResult {
    inStock: Boolean!
    requiredQty: Int!
  }

  type ProductAvailability {
    productId: ID!
    available: Boolean!
    requiredQty: Int!
    stockQty: Int!
  }

  extend type Query {
    # Admin queries
    adminProducts(
      page: Int = 1
      limit: Int = 10
      search: String
      categoryId: ID
      inStockOnly: Boolean
    ): ProductConnection!
    adminProduct(id: ID!): Product
    adminProductBySlug(slug: String!): Product
    adminProductsByCategory(categoryId: ID!): [Product!]!
    adminProductStockCheck(id: ID!, qty: Int = 1): StockCheckResult!
    
    # Public category queries
    categories(page: Int = 1, limit: Int = 10, search: String): CategoryConnection!
    category(id: ID!): Category
    categoryBySlug(slug: String!): Category
    categoryProducts(slug: String!, page: Int = 1, limit: Int = 10, inStockOnly: Boolean = true): CategoryProductsResult!
    
    # Public product queries
    products(
      page: Int = 1
      limit: Int = 10
      search: String
      categoryId: ID
      inStockOnly: Boolean = true
    ): ProductConnection!
    product(id: ID!): Product!
    productBySlug(slug: String!): Product!
    productsByCategory(categoryId: ID!): [Product!]!
    productAvailability(id: ID!, qty: Int = 1): ProductAvailability!
    featuredProducts(limit: Int = 8): ProductConnection!
    searchProducts(
      search: String
      categoryId: ID
      inStockOnly: Boolean = true
      page: Int = 1
      limit: Int = 10
    ): ProductConnection!
  }

  extend type Mutation {
    adminCreateProduct(input: CreateProductInput!): Product!
    adminUpdateProduct(id: ID!, input: UpdateProductInput!): Product!
    adminDeleteProduct(id: ID!): Boolean!
    adminIncreaseProductStock(id: ID!, input: StockOperationInput!): Product!
    adminDecreaseProductStock(id: ID!, input: StockOperationInput!): Product!
    adminUpdateProductPrice(id: ID!, input: PriceUpdateInput!): Product!
  }
`;

// GraphQL type definitions for Cart
const cartTypeDefs = `
  type Cart {
    id: ID!
    user: User
    items: [CartItem!]!
    createdAt: String!
    updatedAt: String!
  }

  type CartItem {
    id: ID!
    cart: Cart!
    product: Product!
    qty: Int!
    createdAt: String!
    updatedAt: String!
  }

  type CartListResult {
    data: [Cart!]!
    pagination: Pagination!
  }

  type CartStats {
    totalCarts: Int!
    activeCarts: Int!
    emptyCarts: Int!
  }

  input CreateCartInput {
    userId: ID!
  }

  input AddCartItemInput {
    cartId: ID!
    productId: ID!
    qty: Int!
  }

  input AddItemToCartInput {
    productId: ID!
    quantity: Int!
  }

  input UpdateCartItemInput {
    qty: Int!
  }

  extend type Query {
    # User Cart Queries
    userCart: Cart!
  }

  extend type Mutation {
    # User Cart Mutations
    addItemToCart(input: AddItemToCartInput!): Cart!
    removeItemFromCart(productId: ID!): Cart!
    clearCart: Cart!
  }
`;

export const typeDefs = [baseTypeDefs, productTypeDefs, cartTypeDefs];
