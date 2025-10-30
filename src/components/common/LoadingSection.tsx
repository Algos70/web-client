import LoadingSpinner from "../auth/LoadingSpinner";
import SectionHeader from "./SectionHeader";

interface LoadingSectionProps {
  title: string;
  subtitle: string;
}

export default function LoadingSection({ title, subtitle }: LoadingSectionProps) {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    </section>
  );
}