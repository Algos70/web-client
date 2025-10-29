import React, { useState } from 'react';
import { 
  useAdminCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '../../lib/graphql/hooks';
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '../../lib/graphql/types';

export default function CategoryManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Queries
  const { loading, error, data, refetch } = useAdminCategories(page, 10, search);

  // Mutations
  const [createCategory, { loading: creating }] = useCreateCategory();
  const [updateCategory, { loading: updating }] = useUpdateCategory();
  const [deleteCategory, { loading: deleting }] = useDeleteCategory();

  const handleCreate = async (input: CreateCategoryInput) => {
    try {
      await createCategory({ 
        variables: { input },
        onCompleted: () => {
          setShowCreateForm(false);
          refetch();
        }
      });
    } catch (err) {
      console.error('Create category error:', err);
    }
  };

  const handleUpdate = async (id: string, input: UpdateCategoryInput) => {
    try {
      await updateCategory({ 
        variables: { id, input },
        onCompleted: () => {
          setEditingCategory(null);
          refetch();
        }
      });
    } catch (err) {
      console.error('Update category error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory({ 
          variables: { id },
          onCompleted: () => {
            refetch();
          }
        });
      } catch (err) {
        console.error('Delete category error:', err);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading categories...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <CategoryForm
          onSubmit={(input) => handleCreate(input as CreateCategoryInput)}
          onCancel={() => setShowCreateForm(false)}
          loading={creating}
          isCreate={true}
        />
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.adminCategories.categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCategory?.id === category.id ? (
                    <CategoryForm
                      category={category}
                      onSubmit={(input) => handleUpdate(category.id, input as UpdateCategoryInput)}
                      onCancel={() => setEditingCategory(null)}
                      loading={updating}
                      isCreate={false}
                    />
                  ) : (
                    <div className="font-medium text-gray-900">{category.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  /{category.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.products?.length || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingCategory?.id === category.id ? null : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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

      {/* Pagination */}
      {data?.adminCategories.pagination && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {data.adminCategories.categories.length} of {data.adminCategories.pagination.total} categories
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {page} of {data.adminCategories.pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= data.adminCategories.pagination.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Category Form Component
interface CategoryFormProps {
  category?: Category;
  onSubmit: (input: any) => void;
  onCancel: () => void;
  loading: boolean;
  isCreate: boolean;
}

function CategoryForm({ category, onSubmit, onCancel, loading, isCreate }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || '');
  const [slug, setSlug] = useState(category?.slug || '');

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
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
          {loading ? 'Saving...' : isCreate ? 'Create' : 'Update'}
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