import { BreadcrumbItem } from "../../components/common/Breadcrumb";
import { Product, Category } from "../graphql/types";

export const createHomeBreadcrumb = (): BreadcrumbItem => ({
  label: "Home",
  href: "/",
});

export const createProductsBreadcrumb = (): BreadcrumbItem => ({
  label: "Products",
  href: "/products",
});

export const createCategoriesBreadcrumb = (): BreadcrumbItem => ({
  label: "Categories",
  href: "/categories",
});

export const createCategoryBreadcrumb = (
  category: Category
): BreadcrumbItem => ({
  label: category.name,
  href: `/categories/${category.slug}`,
});

export const createProductBreadcrumb = (product: Product): BreadcrumbItem => ({
  label: product.name,
  isActive: true,
});

// Predefined breadcrumb combinations
export const getProductsBreadcrumbs = (): BreadcrumbItem[] => [
  createHomeBreadcrumb(),
  { label: "All Products", isActive: true },
];

export const getCategoriesBreadcrumbs = (): BreadcrumbItem[] => [
  createHomeBreadcrumb(),
  { label: "Categories", isActive: true },
];

export const getCategoryBreadcrumbs = (
  categoryName?: string
): BreadcrumbItem[] => [
  createHomeBreadcrumb(),
  createCategoriesBreadcrumb(),
  { label: categoryName || "Category", isActive: true },
];

export const getProductDetailBreadcrumbs = (
  product: Product
): BreadcrumbItem[] => {
  const breadcrumbs = [createHomeBreadcrumb(), createCategoriesBreadcrumb()];

  if (product.category) {
    breadcrumbs.push(createCategoryBreadcrumb(product.category));
  }

  breadcrumbs.push(createProductsBreadcrumb());
  breadcrumbs.push(createProductBreadcrumb(product));

  return breadcrumbs;
};
