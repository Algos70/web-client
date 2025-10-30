import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@apollo/client/react";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import CategoryProductsGrid from "../components/common/CategoryProductsGrid";
import ProductsHeader from "../components/common/ProductsHeader";
import Pagination from "../components/common/Pagination";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import ErrorPage from "../components/common/ErrorPage";
import { GET_PRODUCTS } from "../lib/graphql/queries";
import { ProductConnection } from "../lib/graphql/types";

interface ProductsQueryResponse {
  products: ProductConnection;
}

export default function ProductsPage() {
  const router = useRouter();
  const { page: pageParam, search, categoryId } = router.query;
  const currentPage = parseInt(pageParam as string) || 1;

  const { data, loading, error } = useQuery<ProductsQueryResponse>(
    GET_PRODUCTS,
    {
      variables: {
        page: currentPage,
        limit: 10,
        search: search as string,
        categoryId: categoryId as string,
        inStockOnly: true,
      },
    }
  );

  if (loading) {
    return (
      <>
        <Head>
          <title>All Products - E-Commerce Store</title>
        </Head>
        <LoadingSkeleton itemCount={10} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Products - E-Commerce Store</title>
        </Head>
        <ErrorPage
          title="Error Loading Products"
          message="Something went wrong while loading products."
        />
      </>
    );
  }

  const productsData = data?.products;
  const products = productsData?.products || [];
  const pagination = productsData?.pagination;

  return (
    <>
      <Head>
        <title>All Products - E-Commerce Store</title>
        <meta name="description" content="Browse all products in our store" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductsHeader
            productsCount={products.length}
            totalProducts={pagination?.total || 0}
          />

          <CategoryProductsGrid products={products} />

          <Pagination
            pagination={pagination}
            baseUrl="/products"
            queryParams={{
              search: search as string,
              categoryId: categoryId as string,
            }}
          />
        </div>
      </div>
    </>
  );
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

ProductsPage.requireAuth = true;
