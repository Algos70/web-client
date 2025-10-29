import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { isPublicRoute } from "../lib/constants/routes";
import AppLayout from "../components/layouts/AppLayout";
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
    <AppLayout requireAuth={requireAuth}>
      {getLayout(<Component {...pageProps} />)}
    </AppLayout>
  );
}
