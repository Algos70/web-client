export default function EmptyCart() {
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4m-8 2h.01M15 15h.01"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-slate-500 mb-6">
        Start shopping to add items to your cart
      </p>
      <a
        href="/products"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
      >
        Continue Shopping
      </a>
    </div>
  );
}