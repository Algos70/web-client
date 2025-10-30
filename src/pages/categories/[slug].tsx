import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@apollo/client/react";
import AuthenticatedLayout from "../../components/layouts/AuthenticatedLayout";
import CategoryHeader from "../../components/common/CategoryHeader";
import CategoryProductsGrid from "../../components/common/CategoryProductsGrid";
import Pagination from "../../components/common/Pagination";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import ErrorPage from "../../components/common/ErrorPage";
import { GET_CATEGORY_PRODUCTS } from "../../lib/graphql/queries";
import { CategoryProductsResult } from "../../lib/graphql/types";

interface CategoryProductsQueryResponse {
  categoryProducts: CategoryProductsResult;
}

export default function CategoryPage() {
  const router = useRouter();
  const { slug, page: pageParam } = router.query;
  const currentPage = parseInt(pageParam as string) || 1;

  const { data, loading, error } = useQuery<CategoryProductsQueryResponse>(
    GET_CATEGORY_PRODUCTS,
    {
      variables: {
        slug: slug as string,
        page: currentPage,
        limit: 5, // Reduced to test pagination
        inStockOnly: true,
      },
      skip: !slug,
    }
  );

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Category - E-Ticaret Mağazası</title>
        </Head>
        <LoadingSkeleton itemCount={5} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Category Not Found - E-Ticaret Mağazası</title>
        </Head>
        <ErrorPage
          title="Category Not Found"
          message="The category you're looking for doesn't exist."
        />
      </>
    );
  }

  const categoryData = data?.categoryProducts;
  const category = categoryData?.category;
  const products = categoryData?.products || [];
  const pagination = categoryData?.pagination;

  return (
    <>
      <Head>
        <title>{category?.name || "Category"} - E-Ticaret Mağazası</title>
        <meta
          name="description"
          content={`Browse ${category?.name} products in our store`}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryHeader
            categoryName={category?.name}
            productsCount={products.length}
            totalProducts={pagination?.total || 0}
          />

          <CategoryProductsGrid products={products} />

          <Pagination pagination={pagination} baseUrl={`/categories/${slug}`} />
        </div>
      </div>
    </>
  );
}

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

CategoryPage.requireAuth = true;
