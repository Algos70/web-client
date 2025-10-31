import Breadcrumb from "../common/Breadcrumb";
import { getProductDetailBreadcrumbs } from "../../lib/utils/breadcrumbHelpers";
import { Product } from "../../lib/graphql/types";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const breadcrumbItems = getProductDetailBreadcrumbs(product);

  return <Breadcrumb items={breadcrumbItems} />;
}