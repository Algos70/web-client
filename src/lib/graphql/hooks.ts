import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_ADMIN_CATEGORIES,
  GET_ADMIN_CATEGORY,
  GET_ADMIN_CATEGORY_BY_SLUG,
} from "./queries";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./mutations";
import type { 
  Category, 
  CategoryConnection, 
  CreateCategoryInput, 
  UpdateCategoryInput 
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
