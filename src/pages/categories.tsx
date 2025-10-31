import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from '@apollo/client/react';
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import Breadcrumb from "../components/common/Breadcrumb";
import Pagination from "../components/common/Pagination";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import ErrorPage from "../components/common/ErrorPage";
import { getCategoriesBreadcrumbs } from "../lib/utils/breadcrumbHelpers";
import { GET_CATEGORIES } from "../lib/graphql/queries";
import { CategoryConnection } from "../lib/graphql/types";
import { createSSRHandler, extractCategoryFilters } from "../lib/utils/ssr";

interface CategoriesQueryResponse {
  categories: CategoryConnection;
}

interface CategoriesPageProps {
  categoriesData?: CategoryConnection;
}

// Helper functions from CategoriesSection
function getCategoryColor(categoryName: string): string {
  const colorMap: { [key: string]: string } = {
    'electronics': 'from-blue-500 to-blue-700',
    'fashion': 'from-pink-500 to-rose-600',
    'home': 'from-green-500 to-emerald-600',
    'garden': 'from-lime-500 to-green-600',
    'sports': 'from-orange-500 to-red-600',
    'books': 'from-purple-500 to-indigo-600',
    'beauty': 'from-rose-400 to-pink-600',
    'toys': 'from-yellow-400 to-orange-500',
    'automotive': 'from-gray-600 to-gray-800',
    'food': 'from-amber-500 to-orange-600',
    'health': 'from-teal-500 to-cyan-600',
    'music': 'from-violet-500 to-purple-600',
    'art': 'from-fuchsia-500 to-pink-600',
    'travel': 'from-sky-500 to-blue-600',
    'pet': 'from-emerald-400 to-teal-600'
  };
  
  const lowerName = categoryName.toLowerCase();
  
  for (const [key, color] of Object.entries(colorMap)) {
    if (lowerName.includes(key)) {
      return color;
    }
  }
  
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'from-indigo-500 to-blue-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-yellow-500 to-orange-600',
    'from-red-500 to-pink-600',
    'from-blue-500 to-indigo-600',
    'from-teal-500 to-green-600',
    'from-orange-500 to-red-600'
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

function getCategoryIcon(categoryName: string): string {
  const iconMap: { [key: string]: string } = {
    'electronics': '📱',
    'fashion': '👗',
    'home': '🏠',
    'garden': '🌱',
    'sports': '⚽',
    'books': '📚',
    'beauty': '💄',
    'toys': '🧸',
    'automotive': '🚗',
    'food': '🍕',
    'health': '💊',
    'music': '🎵',
    'art': '🎨',
    'travel': '✈️',
    'pet': '🐕',
    'jewelry': '💎',
    'furniture': '🪑',
    'kitchen': '🍳',
    'baby': '👶',
    'office': '💼'
  };
  
  const lowerName = categoryName.toLowerCase();
  
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }
  
  return '🛍️';
}

export default function CategoriesPage({ categoriesData: initialCategoriesData }: CategoriesPageProps) {
  const router = useRouter();
  const { page: pageParam, search } = router.query;
  const currentPage = parseInt(pageParam as string) || 1;

  const { data, loading, error } = useQuery<CategoriesQueryResponse>(GET_CATEGORIES, {
    variables: {
      page: currentPage,
      limit: 10,
      search: search as string
    },
    skip: !!initialCategoriesData && currentPage === 1 && !search
  });

  if (loading) {
    return (
      <>
        <Head>
          <title>All Categories - E-Commerce Store</title>
        </Head>
        <LoadingSkeleton itemCount={10} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Categories - E-Commerce Store</title>
        </Head>
        <ErrorPage
          title="Error Loading Categories"
          message="Something went wrong while loading categories."
        />
      </>
    );
  }

  // Use SSR data if conditions match, otherwise use client data
  const shouldUseSSRData = !!initialCategoriesData && currentPage === 1 && !search;
  const categoriesData = shouldUseSSRData ? initialCategoriesData : data?.categories;
  const categories = categoriesData?.categories || [];
  const pagination = categoriesData?.pagination;

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/categories/${categorySlug}`);
  };

  return (
    <>
      <Head>
        <title>All Categories - E-Commerce Store</title>
        <meta name="description" content="Browse all product categories in our store" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumb items={getCategoriesBreadcrumbs()} />
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h1>
            <p className="text-gray-600">
              Showing {categories.length} of {pagination?.total || 0} categories
            </p>
          </div>

          {/* Categories Grid */}
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  id={`category-${category.slug}`}
                  className="group cursor-pointer"
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category.name)} opacity-90 group-hover:opacity-95 transition-opacity duration-300`}></div>
                    
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                    
                    <div className="relative z-10 h-48 flex flex-col justify-end p-6 text-white">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-all duration-300">
                          <span className="text-2xl">
                            {getCategoryIcon(category.name)}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white text-opacity-90 mb-2">
                        Explore our {category.name.toLowerCase()} collection
                      </p>
                      <span className="text-xs text-gray-900 bg-white bg-opacity-90 px-2 py-1 rounded-full inline-block w-fit font-medium">
                        {category.products?.length || 0} products
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Found</h3>
              <p className="text-gray-600">No categories are available at the moment.</p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            pagination={pagination}
            baseUrl="/categories"
            queryParams={{
              search: search as string,
            }}
          />
        </div>
      </div>
    </>
  );
}

CategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

CategoriesPage.requireAuth = true;

export const getServerSideProps = createSSRHandler({
  queries: [
    {
      query: GET_CATEGORIES,
      variables: extractCategoryFilters,
    },
  ],
  skipAuthErrors: true, // Categories can be viewed without auth
});