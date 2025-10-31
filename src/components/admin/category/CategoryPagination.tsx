import React from "react";
import type { Pagination } from "../../../lib/graphql/types";

interface CategoryPaginationProps {
  pagination: Pagination;
  currentPage: number;
  onPageChange: (page: number) => void;
  categoriesCount: number;
}

export default function CategoryPagination({
  pagination,
  currentPage,
  onPageChange,
  categoriesCount,
}: CategoryPaginationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="text-sm text-gray-500">
        Showing {categoriesCount} of {pagination.total} categories
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= pagination.totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}