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