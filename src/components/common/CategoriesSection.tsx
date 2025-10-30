import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/router";
import { GET_CATEGORIES } from "../../lib/graphql/queries";
import { Category, CategoryConnection } from "../../lib/graphql/types";

interface CategoriesQueryResponse {
  categories: CategoryConnection;
}

// Helper function to get unique background color based on category name
function getCategoryColor(categoryName: string): string {
  const colorMap: { [key: string]: string } = {
    electronics: "from-blue-500 to-blue-700",
    fashion: "from-pink-500 to-rose-600",
    home: "from-green-500 to-emerald-600",
    garden: "from-lime-500 to-green-600",
    sports: "from-orange-500 to-red-600",
    books: "from-purple-500 to-indigo-600",
    beauty: "from-rose-400 to-pink-600",
    toys: "from-yellow-400 to-orange-500",
    automotive: "from-gray-600 to-gray-800",
    food: "from-amber-500 to-orange-600",
    health: "from-teal-500 to-cyan-600",
    music: "from-violet-500 to-purple-600",
    art: "from-fuchsia-500 to-pink-600",
    travel: "from-sky-500 to-blue-600",
    pet: "from-emerald-400 to-teal-600",
  };

  const lowerName = categoryName.toLowerCase();

  // Try to find a matching color
  for (const [key, color] of Object.entries(colorMap)) {
    if (lowerName.includes(key)) {
      return color;
    }
  }

  // Generate a unique color based on category name hash if no match found
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "from-indigo-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-orange-600",
    "from-red-500 to-pink-600",
    "from-blue-500 to-indigo-600",
    "from-teal-500 to-green-600",
    "from-orange-500 to-red-600",
  ];

  return colors[Math.abs(hash) % colors.length];
}

// Helper function to get category icon based on name
function getCategoryIcon(categoryName: string): string {
  const iconMap: { [key: string]: string } = {
    electronics: "📱",
    fashion: "👗",
    home: "🏠",
    garden: "🌱",
    sports: "⚽",
    books: "📚",
    beauty: "💄",
    toys: "🧸",
    automotive: "🚗",
    food: "🍕",
    health: "💊",
    music: "🎵",
    art: "🎨",
    travel: "✈️",
    pet: "🐕",
    jewelry: "💎",
    furniture: "🪑",
    kitchen: "🍳",
    baby: "👶",
    office: "💼",
  };

  const lowerName = categoryName.toLowerCase();

  // Try to find a matching icon
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }

  // Default icon if no match found
  return "🛍️";
}

export default function CategoriesSection() {
  const router = useRouter();
  const { data, loading, error } = useQuery<CategoriesQueryResponse>(
    GET_CATEGORIES,
    {
      variables: {
        page: 1,
        limit: 6, // Show 6 categories on homepage
      },
    }
  );

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/categories/${categorySlug}`);
  };
  // Loading state
  if (loading) {
    return (
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 rounded-lg h-48 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
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

  const displayCategories: Category[] = data?.categories?.categories || [];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category: Category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                {/* Gradient background with unique color for each category */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(
                    category.name
                  )} opacity-90 group-hover:opacity-95 transition-opacity duration-300`}
                ></div>

                {/* Optional subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>

                <div className="relative z-10 h-48 flex flex-col justify-end p-6 text-white">
                  <div className="mb-4">
                    {/* Category icon based on name */}
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

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/categories")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            View All Categories
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
