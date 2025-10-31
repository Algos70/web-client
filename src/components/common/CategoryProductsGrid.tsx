import ProductCard from "./ProductCard";
import { Product } from "../../lib/graphql/types";

interface CategoryProductsGridProps {
  products: Product[];
}

export default function CategoryProductsGrid({ products }: CategoryProductsGridProps) {
  if (products.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📦</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
      <p className="text-gray-600">This category doesn't have any products yet.</p>
    </div>
  );
}