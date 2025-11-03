import { useRouter } from "next/router";

export default function EmptyOrders() {
  const router = useRouter();

  return (
    <div className="text-center py-12">
      <div className="text-slate-400 mb-4">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">
        No orders yet
      </h3>
      <p className="text-slate-500 mb-6">
        Start shopping to see your orders here
      </p>
      <button
        onClick={() => router.push("/products")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
      >
        Start Shopping
      </button>
    </div>
  );
}