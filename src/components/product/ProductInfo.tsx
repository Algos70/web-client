import { Product } from "../../lib/graphql/types";
import { useAddItemToCart } from "../../lib/graphql/hooks";
import ProductStock from "./ProductStock";
import ProductDetails from "./ProductDetails";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [addItemToCart, { loading: addingToCart }] = useAddItemToCart();
  
  const formatPrice = (priceMinor: number, currency: string) => {
    const price = priceMinor / 100;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const handleAddToCart = async () => {
    try {
      await addItemToCart({
        variables: {
          input: {
            productId: product.id,
            quantity: 1
          }
        }
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="flex flex-col">
      {product.category && (
        <span className="text-sm text-blue-600 font-medium mb-2">
          {product.category.name}
        </span>
      )}
      
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        {product.name}
      </h1>

      <div className="text-xl font-bold text-gray-900 mb-3">
        {formatPrice(product.priceMinor, product.currency)}
      </div>

      <ProductStock stockQty={product.stockQty} />

      {/* Add to Cart Button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 text-sm"
        disabled={product.stockQty === 0 || addingToCart}
        onClick={handleAddToCart}
      >
        {product.stockQty === 0 
          ? "Out of Stock" 
          : addingToCart 
            ? "Adding..." 
            : "Add to Cart"
        }
      </button>

      <ProductDetails product={product} />
    </div>
  );
}