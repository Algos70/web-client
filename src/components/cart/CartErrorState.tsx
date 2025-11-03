import Head from "next/head";

interface CartErrorStateProps {
  error: string;
}

export default function CartErrorState({ error }: CartErrorStateProps) {
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-red-600">Error loading cart: {error}</p>
        </div>
      </div>
    </>
  );
}