import { Product } from "../../lib/graphql/types";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

interface ProductDetailLayoutProps {
  product: Product;
}

export default function ProductDetailLayout({ product }: ProductDetailLayoutProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <ProductImage productName={product.name} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}