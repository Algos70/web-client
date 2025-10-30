import { Product } from "../../lib/graphql/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (priceMinor: number, currency: string) => {
    const price = priceMinor / 100;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src="/images/placeholder-img.png"
        alt={product.name}
        className="w-full h-48 object-fit bg-gray-100"
      />
      <div className="p-4">
        {product.category && (
          <span className="text-sm text-blue-600 font-medium">
            {product.category.name}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.priceMinor, product.currency)}
          </span>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stockQty === 0}
          >
            {product.stockQty === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
        {product.stockQty > 0 && product.stockQty <= 5 && (
          <p className="text-sm text-orange-600 mt-2">
            Only {product.stockQty} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}