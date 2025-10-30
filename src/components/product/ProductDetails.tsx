import { Product } from "../../lib/graphql/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="border-t pt-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Product Details
      </h3>
      <dl className="space-y-1">
        <div className="flex justify-between">
          <dt className="text-gray-600 text-xs">SKU:</dt>
          <dd className="text-gray-900 font-medium text-xs">
            {product.id.slice(0, 8).toUpperCase()}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600 text-xs">Category:</dt>
          <dd className="text-gray-900 font-medium text-xs">
            {product.category?.name || "Uncategorized"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600 text-xs">Stock:</dt>
          <dd className="text-gray-900 font-medium text-xs">{product.stockQty} units</dd>
        </div>
      </dl>
    </div>
  );
}