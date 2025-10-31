import Breadcrumb from "./Breadcrumb";
import { getProductsBreadcrumbs } from "../../lib/utils/breadcrumbHelpers";

interface ProductsHeaderProps {
  productsCount: number;
  totalProducts: number;
}

export default function ProductsHeader({ 
  productsCount, 
  totalProducts 
}: ProductsHeaderProps) {
  const breadcrumbItems = getProductsBreadcrumbs();

  return (
    <div className="mb-8">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
      <p className="text-gray-600">
        Showing {productsCount} of {totalProducts} products
      </p>
    </div>
  );
}