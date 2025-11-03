import { useRouter } from "next/router";

interface ViewAllButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function ViewAllButton({ href, children }: ViewAllButtonProps) {
  const router = useRouter();

  return (
    <div className="text-center mt-12">
      <button
        id="view-all-categories"
        onClick={() => router.push(href)}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
      >
        {children}
        <svg
          className="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}