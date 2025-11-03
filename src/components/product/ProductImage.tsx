import Image from 'next/image';

interface ProductImageProps {
  productName: string;
  imageUrl?: string;
}

export default function ProductImage({ 
  productName, 
  imageUrl = "/images/placeholder-img.png" 
}: ProductImageProps) {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center w-4/5 mx-auto relative">
      <Image
        src={imageUrl}
        alt={productName}
        fill
        className="object-contain p-4"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}