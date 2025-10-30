import SectionHeader from "./SectionHeader";

interface ErrorSectionProps {
  title: string;
  subtitle: string;
  errorMessage: string;
}

export default function ErrorSection({ title, subtitle, errorMessage }: ErrorSectionProps) {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{errorMessage}</p>
        </div>
      </div>
    </section>
  );
}