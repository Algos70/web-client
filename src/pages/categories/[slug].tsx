import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from '@apollo/client/react';
import AuthenticatedLayout from "../../components/layouts/AuthenticatedLayout";
import ProductCard from "../../components/common/ProductCard";
import { GET_CATEGORY_PRODUCTS } from "../../lib/graphql/queries";
import { CategoryProductsResult } from "../../lib/graphql/types";

interface CategoryProductsQueryResponse {
  categoryProducts: CategoryProductsResult;
}

export default function CategoryPage() {
  const router = useRouter();
  const { slug, page: pageParam } = router.query;
  const currentPage = parseInt(pageParam as string) || 1;

  const { data, loading, error } = useQuery<CategoryProductsQueryResponse>(GET_CATEGORY_PRODUCTS, {
    variables: {
      slug: slug as string,
      page: currentPage,
      limit: 5, // Reduced to test pagination
      inStockOnly: true
    },
    skip: !slug
  });

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Category - E-Ticaret Mağazası</title>
        </Head>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4">
                    <div className="h-48 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
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
          <title>Category Not Found - E-Ticaret Mağazası</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </div>
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
        <title>{category?.name || 'Category'} - E-Ticaret Mağazası</title>
        <meta name="description" content={`Browse ${category?.name} products in our store`} />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => router.push('/')}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-900 font-medium">Categories</span>
                </li>
                <li>
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-900 font-medium">{category?.name}</span>
                </li>
              </ol>
            </nav>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category?.name}</h1>
            <p className="text-gray-600">
              Showing {products.length} of {pagination?.total || 0} products
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600">This category doesn't have any products yet.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => {
                    const prevPage = pagination.page - 1;
                    router.push(`/categories/${slug}?page=${prevPage}`);
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="px-3 py-2 text-sm font-medium text-gray-700">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => {
                    const nextPage = pagination.page + 1;
                    router.push(`/categories/${slug}?page=${nextPage}`);
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

CategoryPage.requireAuth = true;