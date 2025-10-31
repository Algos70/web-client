import Head from "next/head";

export default function WalletsLoadingState() {
  return (
    <>
      <Head>
        <title>My Wallets</title>
      </Head>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    </>
  );
}