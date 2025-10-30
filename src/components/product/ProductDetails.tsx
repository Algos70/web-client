import { Product } from "../../lib/graphql/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Product Details
      </h3>
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600">SKU:</dt>
          <dd className="text-gray-900 font-medium">
            {product.id.slice(0, 8).toUpperCase()}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Category:</dt>
          <dd className="text-gray-900 font-medium">
            {product.category?.name || "Uncategorized"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Stock:</dt>
          <dd className="text-gray-900 font-medium">{product.stockQty} units</dd>
        </div>
      </dl>
    </div>
  );
}