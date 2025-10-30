import { useFeaturedProducts } from "../../lib/graphql/hooks";
import LoadingSection from "./LoadingSection";
import ErrorSection from "./ErrorSection";
import SectionHeader from "./SectionHeader";
import ProductGrid from "./ProductGrid";

interface FeaturedProductsProps {
  limit?: number;
}

export default function FeaturedProducts({ limit = 8 }: FeaturedProductsProps) {
  const { data, loading, error } = useFeaturedProducts(limit);

  const sectionTitle = "Products";
  const sectionSubtitle = "";

  if (loading) {
    return <LoadingSection title={sectionTitle} subtitle={sectionSubtitle} />;
  }

  if (error) {
    console.error("Error loading featured products:", error);
    return (
      <ErrorSection
        title={sectionTitle}
        subtitle={sectionSubtitle}
        errorMessage="Failed to load featured products. Please try again later."
      />
    );
  }

  const displayProducts = data?.featuredProducts?.products || [];

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        <ProductGrid products={displayProducts} />
      </div>
    </section>
  );
}
