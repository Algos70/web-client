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

// TODO: Add other queries when schemas are provided
// - Product queries
// - User queries  
// - Order queries
// - Cart queries
// - Wallet queries