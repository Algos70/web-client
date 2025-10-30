import { productTypeDefs } from "./types/Product";

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

  type Category {
    id: ID!
    slug: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
`;

export const typeDefs = [
  baseTypeDefs,
  productTypeDefs,
];