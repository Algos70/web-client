import React from "react";
import type { Category, UpdateCategoryInput } from "../../../lib/graphql/types";
import CategoryForm from "./CategoryForm";

interface CategoryTableProps {
  categories: Category[];
  editingCategory: Category | null;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onUpdate: (id: string, input: UpdateCategoryInput) => void;
  onCancelEdit: () => void;
  updating: boolean;
  deleting: boolean;
}

export default function CategoryTable({
  categories,
  editingCategory,
  onEdit,
  onDelete,
  onUpdate,
  onCancelEdit,
  updating,
  deleting,
}: CategoryTableProps) {
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "N/A";
      
      // Parse as timestamp (string to number)
      const timestamp = parseInt(dateString);
      
      if (isNaN(timestamp)) {
        // If not a number, try as ISO string
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return "Invalid Date";
        }
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
      
      // Create date from timestamp
      const date = new Date(timestamp);
      
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error, "for date:", dateString);
      return "Invalid Date";
    }
  };
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Slug
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Products
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingCategory?.id === category.id ? (
                  <CategoryForm
                    category={category}
                    onSubmit={(input) => onUpdate(category.id, input)}
                    onCancel={onCancelEdit}
                    loading={updating}
                    isCreate={false}
                  />
                ) : (
                  <div className="font-medium text-gray-900">
                    {category.name}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                /{category.slug}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {category.products?.length || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(category.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingCategory?.id === category.id ? null : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(category)}
                      disabled={deleting}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}