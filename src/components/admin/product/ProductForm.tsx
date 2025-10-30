import { useState, useEffect } from 'react';
import { useCreateProduct, useUpdateProduct } from '../../../lib/graphql/hooks';
import { useAdminCategories } from '../../../lib/graphql/hooks';
import { Product, CreateProductInput, UpdateProductInput } from '../../../lib/graphql/types';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    priceMinor: 0,
    currency: 'USD',
    stockQty: 0,
    categoryId: '',
  });

  const [createProduct, { loading: creating }] = useCreateProduct();
  const [updateProduct, { loading: updating }] = useUpdateProduct();
  const { data: categoriesData } = useAdminCategories(1, 100);

  const isEditing = !!product;
  const loading = creating || updating;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        priceMinor: product.priceMinor,
        currency: product.currency,
        stockQty: product.stockQty,
        categoryId: product.category.id,
      });
    }
  }, [product]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: !isEditing ? generateSlug(name) : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && product) {
        const input: UpdateProductInput = {
          name: formData.name,
          slug: formData.slug,
          priceMinor: formData.priceMinor,
          currency: formData.currency,
          stockQty: formData.stockQty,
          categoryId: formData.categoryId,
        };
        await updateProduct({
          variables: { id: product.id, input }
        });
      } else {
        const input: CreateProductInput = {
          name: formData.name,
          slug: formData.slug,
          priceMinor: formData.priceMinor,
          currency: formData.currency,
          stockQty: formData.stockQty,
          categoryId: formData.categoryId,
        };
        await createProduct({
          variables: { input }
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
                placeholder="product-slug"
              />
              <p className="text-xs text-slate-500 mt-1">
                URL-friendly version of the name
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price (cents) *
                </label>
                <input
                  type="number"
                  value={formData.priceMinor}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceMinor: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                  min="0"
                  placeholder="2999"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Price in cents (e.g., 2999 = $29.99)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Currency *
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm uppercase"
                  required
                  placeholder="USD"
                  maxLength={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                value={formData.stockQty}
                onChange={(e) => setFormData(prev => ({ ...prev, stockQty: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
                min="0"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                required
              >
                <option value="">Select a category</option>
                {categoriesData?.adminCategories.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (isEditing ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}