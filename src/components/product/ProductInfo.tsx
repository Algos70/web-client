import toast from "react-hot-toast";
import { Product } from "../../lib/graphql/types";
import { useAddItemToCart } from "../../lib/graphql/hooks";
import ProductStock from "./ProductStock";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "../../lib/utils/currency";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [addItemToCart, { loading: addingToCart }] = useAddItemToCart();



  const handleAddToCart = async () => {
    try {
      const result = await addItemToCart({
        variables: {
          input: {
            productId: product.id,
            quantity: 1,
          },
        },
        errorPolicy: "all",
      });

      // Check if there are GraphQL errors in the result
      if (result.error) {
        const errorMessage = result.error.message || "An error occurred while adding item to cart.";
        toast.error(errorMessage, { 
          id: `product-fail-${product.id}`,
          className: 'product-error-toast'
        });
      } else if (result.data?.addItemToCart) {
        const { success, message } = result.data.addItemToCart;
        if (success) {
          toast.success(message || "Product added to cart successfully!", { 
            id: `product-success-${product.id}`,
            className: 'product-success-toast'
          });
        } else {
          toast.error(message || "Failed to add product to cart", { 
            id: `product-fail-${product.id}`,
            className: 'product-error-toast'
          });
        }
      }
    } catch (error: unknown) {
      console.error("Error adding item to cart:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while adding item to cart.";
      toast.error(errorMessage, { 
        id: `product-fail-${product.id}`,
        className: 'product-error-toast'
      });
    }
  };

  return (
    <div className="flex flex-col">
      {product.category && (
        <span className="text-sm text-blue-600 font-medium mb-2">
          {product.category.name}
        </span>
      )}

      <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>

      <div className="price text-xl font-bold text-gray-900 mb-3" id={product.currency}>
        {formatCurrency(product.priceMinor.toString(), product.currency)}
      </div>

      <ProductStock stockQty={product.stockQty} />

      {/* Add to Cart Button */}
      <button
        id={`add-to-cart-${product.slug}`}
        className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 text-sm"
        disabled={product.stockQty === 0 || addingToCart}
        onClick={handleAddToCart}
      >
        {product.stockQty === 0
          ? "Out of Stock"
          : addingToCart
          ? "Adding..."
          : "Add to Cart"}
      </button>

      <ProductDetails product={product} />
    </div>
  );
}
