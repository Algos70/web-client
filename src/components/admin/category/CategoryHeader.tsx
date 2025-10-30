import React from "react";

interface CategoryHeaderProps {
  onAddCategory: () => void;
}

export default function CategoryHeader({ onAddCategory }: CategoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text mb-2">
          Category Management
        </h1>
        <p className="text-sm text-slate-600">
          Organize and manage product categories and subcategories.
        </p>
      </div>
      <button
        onClick={onAddCategory}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Add Category
      </button>
    </div>
  );
}