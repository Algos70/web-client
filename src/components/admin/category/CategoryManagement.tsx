import React, { useState } from "react";
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../../lib/graphql/hooks";
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../../lib/graphql/types";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import CategoryHeader from "./CategoryHeader";
import CategorySearch from "./CategorySearch";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import CategoryPagination from "./CategoryPagination";

export default function CategoryManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    category: Category | null;
  }>({
    show: false,
    category: null,
  });

  // Queries
  const { loading, error, data, refetch } = useAdminCategories(
    page,
    10,
    search
  );

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
        },
      });
    } catch (err) {
      console.error("Create category error:", err);
    }
  };

  const handleUpdate = async (id: string, input: UpdateCategoryInput) => {
    try {
      await updateCategory({
        variables: { id, input },
        onCompleted: () => {
          setEditingCategory(null);
          refetch();
        },
      });
    } catch (err) {
      console.error("Update category error:", err);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setDeleteModal({ show: true, category });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.category) return;

    try {
      await deleteCategory({
        variables: { id: deleteModal.category.id },
        onCompleted: () => {
          setDeleteModal({ show: false, category: null });
          refetch();
        },
      });
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, category: null });
  };

  if (loading)
    return <div className="text-center py-8">Loading categories...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        Error: {error.message}
      </div>
    );

  return (
    <div className="card p-6">
      <CategoryHeader onAddCategory={() => setShowCreateForm(true)} />

      <CategorySearch search={search} onSearchChange={setSearch} />

      {/* Create Form */}
      {showCreateForm && (
        <CategoryForm
          onSubmit={(input) => handleCreate(input as CreateCategoryInput)}
          onCancel={() => setShowCreateForm(false)}
          loading={creating}
          isCreate={true}
        />
      )}

      <CategoryTable
        categories={data?.adminCategories.categories || []}
        editingCategory={editingCategory}
        onEdit={setEditingCategory}
        onDelete={handleDeleteClick}
        onUpdate={(id, input) => handleUpdate(id, input as UpdateCategoryInput)}
        onCancelEdit={() => setEditingCategory(null)}
        updating={updating}
        deleting={deleting}
      />

      {/* Pagination */}
      {data?.adminCategories.pagination && (
        <CategoryPagination
          pagination={data.adminCategories.pagination}
          currentPage={page}
          onPageChange={setPage}
          categoriesCount={data.adminCategories.categories.length}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.show}
        title="Delete Category"
        itemName={deleteModal.category?.name || ""}
        itemType="category"
        warningMessage={
          deleteModal.category?.products &&
          deleteModal.category.products.length > 0
            ? `This category has ${deleteModal.category.products.length} product(s) associated with it.`
            : undefined
        }
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleting}
      />
    </div>
  );
}
