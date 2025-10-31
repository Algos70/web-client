import Head from "next/head";

interface OrdersErrorStateProps {
  error: string;
}

export default function OrdersErrorState({ error }: OrdersErrorStateProps) {
  return (
    <>
      <Head>
        <title>My Orders - E-Commerce Store</title>
        <meta name="description" content="View and track your order history." />
      </Head>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center py-8">
              <p className="text-red-600">Error loading orders: {error}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}