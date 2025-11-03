import React, { useState } from "react";
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../../lib/graphql/types";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (input: CreateCategoryInput | UpdateCategoryInput) => void;
  onCancel: () => void;
  loading: boolean;
  isCreate: boolean;
}

export default function CategoryForm({
  category,
  onSubmit,
  onCancel,
  loading,
  isCreate,
}: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "");
  const [slug, setSlug] = useState(category?.slug || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreate) {
      // For create, both name and slug are required
      onSubmit({ name, slug } as CreateCategoryInput);
    } else {
      // For update, only send fields that have values
      const updateInput: UpdateCategoryInput = {};
      if (name.trim()) updateInput.name = name;
      if (slug.trim()) updateInput.slug = slug;
      onSubmit(updateInput);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          type="submit"
          disabled={loading || (isCreate && (!name.trim() || !slug.trim()))}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : isCreate ? "Create" : "Update"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}