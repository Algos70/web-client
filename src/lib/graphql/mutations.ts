import { gql } from "@apollo/client";

// Category Mutations
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    adminCreateCategory(input: $input) {
      id
      slug
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    adminUpdateCategory(id: $id, input: $input) {
      id
      slug
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    adminDeleteCategory(id: $id)
  }
`;

// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    adminCreateProduct(input: $input) {
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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    adminUpdateProduct(id: $id, input: $input) {
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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    adminDeleteProduct(id: $id)
  }
`;

export const INCREASE_PRODUCT_STOCK = gql`
  mutation IncreaseProductStock($id: ID!, $input: StockOperationInput!) {
    adminIncreaseProductStock(id: $id, input: $input) {
      id
      name
      stockQty
      updatedAt
    }
  }
`;

export const DECREASE_PRODUCT_STOCK = gql`
  mutation DecreaseProductStock($id: ID!, $input: StockOperationInput!) {
    adminDecreaseProductStock(id: $id, input: $input) {
      id
      name
      stockQty
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT_PRICE = gql`
  mutation UpdateProductPrice($id: ID!, $input: PriceUpdateInput!) {
    adminUpdateProductPrice(id: $id, input: $input) {
      id
      name
      priceMinor
      currency
      updatedAt
    }
  }
`;

// Cart Mutations
export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($input: AddItemToCartInput!) {
    addItemToCart(input: $input) {
      id
      user {
        id
        email
      }
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

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($productId: ID!) {
    removeItemFromCart(productId: $productId) {
      id
      user {
        id
        email
      }
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

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart {
      id
      user {
        id
        email
      }
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
