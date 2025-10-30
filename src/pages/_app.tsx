import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { isPublicRoute } from "../lib/constants/routes";
import AppLayout from "../components/layouts/AppLayout";
import { ApolloProvider } from "@apollo/client/react";
import { useApollo } from "../lib/graphql/client"
import "../globals.css";

// Page component with layout support
type ComponentWithLayout = AppProps["Component"] & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: ComponentWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const isPublic = isPublicRoute(router.pathname);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // Determine if auth is required (default true for non-public routes)
  const requireAuth = Component.requireAuth ?? !isPublic;

  return (
    <>
      <Head>
        <title>E-Ticaret Mağazası</title>
        <meta name="description" content="En iyi ürünleri keşfedin ve güvenle alışveriş yapın." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={useApollo(pageProps)}>
        <AppLayout requireAuth={requireAuth}>
          {getLayout(<Component {...pageProps} />)}
        </AppLayout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </ApolloProvider>
    </>
  );
}
