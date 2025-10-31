import { useRouter } from "next/router";
import { Pagination as PaginationType } from "../../lib/graphql/types";

interface PaginationProps {
  pagination?: PaginationType;
  baseUrl: string;
  queryParams?: Record<string, string>;
}

export default function Pagination({ pagination, baseUrl, queryParams = {} }: PaginationProps) {
  const router = useRouter();

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    
    // Add page parameter
    params.set('page', page.toString());
    
    // Add other query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center space-x-2">
        <button
          disabled={pagination.page <= 1}
          onClick={() => {
            const prevPage = pagination.page - 1;
            router.push(buildUrl(prevPage));
          }}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
            router.push(buildUrl(nextPage));
          }}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  );
}