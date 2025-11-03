import Head from "next/head";

interface WalletsErrorStateProps {
  error: string;
}

export default function WalletsErrorState({ error }: WalletsErrorStateProps) {
  return (
    <>
      <Head>
        <title>My Wallets</title>
      </Head>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Wallets
            </h2>
            <p className="text-slate-600">{error}</p>
          </div>
        </div>
      </div>
    </>
  );
}