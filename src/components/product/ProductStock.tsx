interface ProductStockProps {
  stockQty: number;
}

export default function ProductStock({ stockQty }: ProductStockProps) {
  return (
    <div className="mb-3">
      {stockQty > 0 ? (
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
          <span className="text-green-700 text-xs font-medium">
            In Stock ({stockQty} available)
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></div>
          <span className="text-red-700 text-xs font-medium">Out of Stock</span>
        </div>
      )}
      
      {stockQty > 0 && stockQty <= 5 && (
        <p className="text-xs text-orange-600 mt-0.5">
          Only {stockQty} left - order soon!
        </p>
      )}
    </div>
  );
}