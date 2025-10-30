import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "../../lib/graphql/queries";
import { CategoryConnection } from "../../lib/graphql/types";
import { getCategoryColor } from "../../lib/utils/categoryColors";
import SectionHeader from "./SectionHeader";
import CategoriesLoadingSkeleton from "./CategoriesLoadingSkeleton";
import CategoriesGrid from "./CategoriesGrid";
import ViewAllButton from "./ViewAllButton";

interface CategoriesQueryResponse {
  categories: CategoryConnection;
}

interface CategoriesSectionProps {
  initialData?: CategoryConnection;
}

export default function CategoriesSection({ initialData }: CategoriesSectionProps) {
  const { data, loading, error } = useQuery<CategoriesQueryResponse>(
    GET_CATEGORIES,
    {
      variables: {
        page: 1,
        limit: 6, // Show 6 categories on homepage
      },
      skip: !!initialData,
    }
  );

  // Use SSR data if available, otherwise use client data
  const categoriesData = initialData || data?.categories;

  // Loading state (only if no SSR data)
  if (loading && !initialData) {
    return (
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Shop by Category"
            subtitle="Find exactly what you're looking for"
          />
          <CategoriesLoadingSkeleton />
        </div>
      </section>
    );
  }

  // Error state (only if no SSR data)
  if (error && !initialData) {
    console.error("Categories fetch error:", error);
    return (
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-red-600">
              Unable to load categories. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayCategories = categoriesData?.categories || [];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Shop by Category"
          subtitle="Find exactly what you're looking for"
        />

        <CategoriesGrid
          categories={displayCategories}
          getCategoryColor={getCategoryColor}
        />

        <ViewAllButton href="/categories">View All Categories</ViewAllButton>
      </div>
    </section>
  );
}
