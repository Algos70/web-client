import Head from "next/head";

export default function OrdersLoadingState() {
  return (
    <>
      <Head>
        <title>My Orders - E-Commerce Store</title>
        <meta name="description" content="View and track your order history." />
      </Head>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}