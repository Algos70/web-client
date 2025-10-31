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

export const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($input: UpdateItemQuantityInput!) {
    updateItemQuantity(input: $input) {
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

export const DECREASE_ITEM_QUANTITY = gql`
  mutation DecreaseItemQuantity($input: DecreaseItemQuantityInput!) {
    decreaseItemQuantity(input: $input) {
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

// Wallet Mutations
export const CREATE_USER_WALLET = gql`
  mutation CreateUserWallet($input: CreateUserWalletInput!) {
    createUserWallet(input: $input) {
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

export const INCREASE_USER_WALLET_BALANCE = gql`
  mutation IncreaseUserWalletBalance($walletId: ID!, $input: BalanceOperationInput!) {
    increaseUserWalletBalance(walletId: $walletId, input: $input) {
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

export const DELETE_USER_WALLET = gql`
  mutation DeleteUserWallet($walletId: ID!) {
    deleteUserWallet(walletId: $walletId)
  }
`;

export const TRANSFER_FROM_USER_WALLET = gql`
  mutation TransferFromUserWallet($input: UserTransferInput!) {
    transferFromUserWallet(input: $input) {
      success
      message
    }
  }
`;
// Order Mutations
export const CREATE_ORDER_FROM_CART = gql`
  mutation CreateOrderFromCart($input: CreateOrderFromCartInput!) {
    createOrderFromCart(input: $input) {
      id
      totalMinor
      currency
      status
      createdAt
      updatedAt
      user {
        id
        email
      }
      items {
        id
        qty
        unitPriceMinor
        currency
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
    }
  }
`;

// Authentication Mutations
export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      message
      user {
        sub
        email
        preferred_username
        name
        given_name
        family_name
        email_verified
        permissions
        dbUserId
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      success
      message
      user {
        sub
        email
        preferred_username
        name
        given_name
        family_name
        email_verified
        permissions
        dbUserId
      }
    }
  }
`;