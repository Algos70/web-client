import Link from "next/link";

interface HeroHeaderProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

export default function HeroHeader({ 
  title = "E-Commerce Store", 
  subtitle = "Discover amazing products at unbeatable prices",
  showCTA = true 
}: HeroHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
              >
                Shop Now
              </Link>
              <Link
                href="#categories"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
              >
                Browse Categories
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}