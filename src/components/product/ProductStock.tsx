interface ProductStockProps {
  stockQty: number;
}

export default function ProductStock({ stockQty }: ProductStockProps) {
  return (
    <div className="mb-6">
      {stockQty > 0 ? (
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-green-700 font-medium">
            In Stock ({stockQty} available)
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-red-700 font-medium">Out of Stock</span>
        </div>
      )}
      
      {stockQty > 0 && stockQty <= 5 && (
        <p className="text-sm text-orange-600 mt-2">
          Only {stockQty} left in stock - order soon!
        </p>
      )}
    </div>
  );
}