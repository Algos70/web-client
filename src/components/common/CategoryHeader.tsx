import Breadcrumb from "./Breadcrumb";
import { getCategoryBreadcrumbs } from "../../lib/utils/breadcrumbHelpers";

interface CategoryHeaderProps {
  categoryName?: string;
  productsCount: number;
  totalProducts: number;
}

export default function CategoryHeader({ 
  categoryName, 
  productsCount, 
  totalProducts 
}: CategoryHeaderProps) {
  const breadcrumbItems = getCategoryBreadcrumbs(categoryName);

  return (
    <div className="mb-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
      <p className="text-gray-600">
        Showing {productsCount} of {totalProducts} products
      </p>
    </div>
  );
}