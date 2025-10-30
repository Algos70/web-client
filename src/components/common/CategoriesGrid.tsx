import { Category } from "../../lib/graphql/types";
import CategoryCard from "./CategoryCard";

interface CategoriesGridProps {
  categories: Category[];
  getCategoryColor: (slug: string) => string;
}

export default function CategoriesGrid({ categories, getCategoryColor }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category: Category) => (
        <CategoryCard
          key={category.id}
          category={category}
          getCategoryColor={getCategoryColor}
        />
      ))}
    </div>
  );
}