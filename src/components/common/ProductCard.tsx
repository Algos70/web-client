import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Product } from "../../lib/graphql/types";
import { useAddItemToCart } from "../../lib/graphql/hooks";
import { formatCurrency } from "../../lib/utils/currency";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [addItemToCart, { loading: addingToCart }] = useAddItemToCart();

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
        const error = result.error as any;
        if (error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0].message;
          toast.error(errorMessage);
        } else if (error.networkError) {
          toast.error("Network error occurred. Please try again.");
        } else {
          toast.error("An error occurred while adding item to cart.");
        }
      } else {
        toast.success("Product added to cart successfully!");
      }
    } catch (error: any) {
      console.error("Error adding item to cart:", error);

      // Handle network errors or other unexpected errors
      if (error.networkError) {
        toast.error("Network error occurred. Please try again.");
      } else {
        toast.error("An error occurred while adding item to cart.");
      }
    }
  };

  return (
    <div
      id={`product-${product.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
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
            {formatCurrency(product.priceMinor.toString(), product.currency)}
          </span>
          <button
            id={`add-to-cart-${product.id}`}
            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stockQty === 0 || addingToCart}
            onClick={handleAddToCart}
          >
            {product.stockQty === 0
              ? "Out of Stock"
              : addingToCart
              ? "Adding..."
              : "Add to Cart"}
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
