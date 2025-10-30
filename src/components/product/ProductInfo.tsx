import { Product } from "../../lib/graphql/types";
import ProductStock from "./ProductStock";
import ProductDetails from "./ProductDetails";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const formatPrice = (priceMinor: number, currency: string) => {
    const price = priceMinor / 100;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return (
    <div className="flex flex-col">
      {product.category && (
        <span className="text-sm text-blue-600 font-medium mb-2">
          {product.category.name}
        </span>
      )}
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {product.name}
      </h1>

      <div className="text-4xl font-bold text-gray-900 mb-6">
        {formatPrice(product.priceMinor, product.currency)}
      </div>

      <ProductStock stockQty={product.stockQty} />

      {/* Add to Cart Button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        disabled={product.stockQty === 0}
        onClick={() => {
          // Add to cart logic here
          console.log("Add to cart:", product.name);
        }}
      >
        {product.stockQty === 0 ? "Out of Stock" : "Add to Cart"}
      </button>

      <ProductDetails product={product} />
    </div>
  );
}