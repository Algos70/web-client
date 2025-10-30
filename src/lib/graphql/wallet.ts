import { gql } from "@apollo/client";

// Wallet Queries
export const WALLET_QUERIES = {
  // Get all wallets for the authenticated user
  GET_USER_WALLETS: gql`
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
  `,

  // Get user's wallet by currency
  GET_USER_WALLET_BY_CURRENCY: gql`
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
  `,

  // Get balance for user's wallet by currency
  GET_USER_WALLET_BALANCE: gql`
    query GetUserWalletBalance($currency: String!) {
      userWalletBalance(currency: $currency) {
        balanceMinor
        currency
        userId
      }
    }
  `,
};

// Wallet Mutations
export const WALLET_MUTATIONS = {
  // Create a new wallet for the authenticated user
  CREATE_USER_WALLET: gql`
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
  `,

  // Increase balance of user's own wallet
  INCREASE_USER_WALLET_BALANCE: gql`
    mutation IncreaseUserWalletBalance(
      $walletId: ID!
      $input: BalanceOperationInput!
    ) {
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
  `,

  // Delete user's own wallet
  DELETE_USER_WALLET: gql`
    mutation DeleteUserWallet($walletId: ID!) {
      deleteUserWallet(walletId: $walletId)
    }
  `,

  // Transfer money from user's wallet to another wallet
  TRANSFER_FROM_USER_WALLET: gql`
    mutation TransferFromUserWallet($input: UserTransferInput!) {
      transferFromUserWallet(input: $input) {
        success
        message
      }
    }
  `,
};

// Example usage functions with Apollo Client
export const walletOperations = {
  // Query examples
  getUserWallets: () => ({
    query: WALLET_QUERIES.GET_USER_WALLETS,
  }),

  getUserWalletByCurrency: (currency: string) => ({
    query: WALLET_QUERIES.GET_USER_WALLET_BY_CURRENCY,
    variables: { currency },
  }),

  getUserWalletBalance: (currency: string) => ({
    query: WALLET_QUERIES.GET_USER_WALLET_BALANCE,
    variables: { currency },
  }),

  // Mutation examples
  createUserWallet: (currency: string, initialBalanceMinor = "0") => ({
    mutation: WALLET_MUTATIONS.CREATE_USER_WALLET,
    variables: {
      input: {
        currency,
        initialBalanceMinor,
      },
    },
  }),

  increaseUserWalletBalance: (walletId: string, amountMinor: string) => ({
    mutation: WALLET_MUTATIONS.INCREASE_USER_WALLET_BALANCE,
    variables: {
      walletId,
      input: {
        amountMinor,
      },
    },
  }),

  deleteUserWallet: (walletId: string) => ({
    mutation: WALLET_MUTATIONS.DELETE_USER_WALLET,
    variables: { walletId },
  }),

  transferFromUserWallet: (
    toWalletId: string,
    currency: string,
    amountMinor: string
  ) => ({
    mutation: WALLET_MUTATIONS.TRANSFER_FROM_USER_WALLET,
    variables: {
      input: {
        toWalletId,
        currency,
        amountMinor,
      },
    },
  }),
};
