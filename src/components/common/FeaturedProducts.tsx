import { useFeaturedProducts } from "../../lib/graphql/hooks";
import LoadingSection from "./LoadingSection";
import ErrorSection from "./ErrorSection";
import SectionHeader from "./SectionHeader";
import ProductGrid from "./ProductGrid";
import { useRouter } from "next/router";
import { ProductsResult } from "../../lib/graphql/types";

interface FeaturedProductsProps {
  limit?: number;
  initialData?: ProductsResult; // SSR data
}

export default function FeaturedProducts({ limit = 8, initialData }: FeaturedProductsProps) {
  // Skip client-side query if we have SSR data
  const { data, loading, error } = useFeaturedProducts(limit, {
    skip: !!initialData
  });
  const router = useRouter();

  const sectionTitle = "Products";
  const sectionSubtitle = "";

  // Use SSR data if available, otherwise use client data
  const featuredProductsData = initialData || data?.featuredProducts;

  if (loading && !initialData) {
    return <LoadingSection title={sectionTitle} subtitle={sectionSubtitle} />;
  }

  if (error && !initialData) {
    console.error("Error loading featured products:", error);
    return (
      <ErrorSection
        title={sectionTitle}
        subtitle={sectionSubtitle}
        errorMessage="Failed to load featured products. Please try again later."
      />
    );
  }

  const displayProducts = featuredProductsData?.products || [];

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        <ProductGrid products={displayProducts} />

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/products")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            View All Products
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
