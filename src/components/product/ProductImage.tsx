interface ProductImageProps {
  productName: string;
  imageUrl?: string;
}

export default function ProductImage({ 
  productName, 
  imageUrl = "/images/placeholder-img.png" 
}: ProductImageProps) {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center w-4/5 mx-auto">
      <img
        src={imageUrl}
        alt={productName}
        className="max-w-full max-h-full object-contain p-4"
      />
    </div>
  );
}