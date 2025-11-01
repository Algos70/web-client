import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@apollo/client/react";
import AuthenticatedLayout from "../../components/layouts/AuthenticatedLayout";
import ProductBreadcrumb from "../../components/product/ProductBreadcrumb";
import ProductDetailLayout from "../../components/product/ProductDetailLayout";
import ErrorPage from "../../components/common/ErrorPage";
import { GET_PRODUCT_BY_SLUG } from "../../lib/graphql/queries";
import { Product, ProductResult } from "../../lib/graphql/types";
import { createSSRHandler, extractSlug } from "../../lib/utils/ssr";

interface ProductQueryResponse {
  productBySlug: ProductResult;
}

interface ProductDetailPageProps {
  productBySlugData?: ProductResult;
}

export default function ProductDetailPage({ productBySlugData: initialProductResult }: ProductDetailPageProps) {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, error } = useQuery<ProductQueryResponse>(
    GET_PRODUCT_BY_SLUG,
    {
      variables: {
        slug: slug as string,
      },
      skip: !slug || !!initialProductResult,
    }
  );

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Product - E-Commerce Store</title>
        </Head>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-8"></div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-square bg-gray-300 rounded-lg"></div>
                  <div>
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded mb-4"></div>
                    <div className="h-12 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Product Not Found - E-Commerce Store</title>
        </Head>
        <ErrorPage
          title="Product Not Found"
          message="The product you're looking for doesn't exist."
        />
      </>
    );
  }

  const productResult = data?.productBySlug || initialProductResult;
  const product = productResult?.product;

  // Handle ProductResult error states
  if (productResult && !productResult.success) {
    return (
      <>
        <Head>
          <title>Product Not Found - E-Commerce Store</title>
        </Head>
        <ErrorPage
          title="Product Not Found"
          message={productResult.message || "The product you're looking for doesn't exist."}
        />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found - E-Commerce Store</title>
        </Head>
        <ErrorPage
          title="Product Not Found"
          message="The product you're looking for doesn't exist."
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - E-Commerce Store</title>
        <meta name="description" content={`Buy ${product.name} at the best price`} />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductBreadcrumb product={product} />
          <ProductDetailLayout product={product} />
        </div>
      </div>
    </>
  );
}

ProductDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

ProductDetailPage.requireAuth = true;

export const getServerSideProps = createSSRHandler({
  queries: [
    {
      query: GET_PRODUCT_BY_SLUG,
      variables: extractSlug,
      required: true,
    },
  ],
  skipAuthErrors: true, // Product details can be viewed without auth
});