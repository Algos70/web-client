import { ReactElement } from "react";
import Head from "next/head";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import HeroHeader from "../components/common/HeroHeader";
import FeaturedProducts from "../components/common/FeaturedProducts";
import CategoriesSection from "../components/common/CategoriesSection";
import StatsSection from "../components/common/StatsSection";
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

        <StatsSection />
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
