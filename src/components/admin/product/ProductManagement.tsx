import { useState } from "react";
import { useAdminProducts, useDeleteProduct } from "../../../lib/graphql/hooks";
import { Product } from "../../../lib/graphql/types";
import ProductForm from "./ProductForm";
import LoadingSpinner from "../../auth/LoadingSpinner";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

export default function ProductManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data, loading, error, refetch } = useAdminProducts(
    currentPage,
    10,
    searchTerm || undefined,
    selectedCategoryId || undefined,
    inStockOnly
  );

  const [deleteProduct] = useDeleteProduct();

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct({ variables: { id: productToDelete.id } });
      refetch();
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    refetch();
  };

  const formatPrice = (priceMinor: number, currency: string) => {
    return `${(priceMinor / 100).toFixed(2)} ${currency}`;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold gradient-text">
            Product Management
          </h2>
          <p className="text-slate-600 mt-1">Manage your product inventory</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Search Products
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or slug..."
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {/* TODO: Add category options */}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-slate-700">In Stock Only</span>
            </label>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategoryId("");
                setInStockOnly(false);
                setCurrentPage(1);
              }}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data?.adminProducts.products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        /{product.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {formatPrice(product.priceMinor, product.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stockQty > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stockQty} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(parseInt(product.createdAt)).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data?.adminProducts.pagination && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      data.adminProducts.pagination.totalPages,
                      currentPage + 1
                    )
                  )
                }
                disabled={
                  currentPage === data.adminProducts.pagination.totalPages
                }
                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                  currentPage === data.adminProducts.pagination.totalPages
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * 10 + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * 10,
                      data.adminProducts.pagination.total
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {data.adminProducts.pagination.total}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-md border ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>

                  {/* Page numbers */}
                  <div className="hidden md:flex">
                    {Array.from(
                      {
                        length: Math.min(
                          5,
                          data.adminProducts.pagination.totalPages
                        ),
                      },
                      (_, i) => {
                        const pageNum =
                          Math.max(
                            1,
                            Math.min(
                              data.adminProducts.pagination.totalPages - 4,
                              currentPage - 2
                            )
                          ) + i;

                        if (pageNum > data.adminProducts.pagination.totalPages)
                          return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                              currentPage === pageNum
                                ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(
                        Math.min(
                          data.adminProducts.pagination.totalPages,
                          currentPage + 1
                        )
                      )
                    }
                    disabled={
                      currentPage === data.adminProducts.pagination.totalPages
                    }
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md border ${
                      currentPage === data.adminProducts.pagination.totalPages
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    Next
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm product={editingProduct} onClose={handleFormClose} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Product"
        itemName={productToDelete?.name || ""}
        itemType="product"
        warningMessage="This will permanently remove the product from your inventory."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={false}
      />
    </div>
  );
}
