import Head from "next/head";

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Payment</h1>
          <p className="text-red-600">Error loading data: {message}</p>
        </div>
      </div>
    </>
  );
}