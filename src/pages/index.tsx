import { ReactElement } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import HeroHeader from "../components/common/HeroHeader";
import FeaturedProducts from "../components/common/FeaturedProducts";
import CategoriesSection from "../components/common/CategoriesSection";
import { GET_FEATURED_PRODUCTS, GET_CATEGORIES } from "../lib/graphql/queries";
import { createSSRHandler } from "../lib/utils/ssr";

interface HomeProps {
  featuredProductsData?: any;
  categoriesData?: any;
}

export default function Home({ featuredProductsData, categoriesData }: HomeProps) {
  return (
    <>
      <Head>
        <title>Ana Sayfa - E-Ticaret Mağazası</title>
        <meta
          name="description"
          content="En iyi ürünleri keşfedin ve uygun fiyatlarla alışveriş yapın."
        />
      </Head>
      <div className="min-h-screen">
        <HeroHeader
          title="Welcome to Our Store 🚀"
          subtitle="Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast delivery."
        />

        <FeaturedProducts initialData={featuredProductsData} />

        <CategoriesSection initialData={categoriesData} />

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Products Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Customer Support</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
Home.requireAuth = true;

export const getServerSideProps = createSSRHandler({
  queries: [
    {
      query: GET_FEATURED_PRODUCTS,
      variables: () => ({ limit: 8 }),
    },
    {
      query: GET_CATEGORIES,
      variables: () => ({ page: 1, limit: 10 }),
    },
  ],
  skipAuthErrors: true, // Skip auth errors for public content
});
