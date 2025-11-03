import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient | undefined;

// Unified Apollo Client creation with optional headers
function createApolloClient(headers?: Record<string, string>) {
  const graphqlUrl =
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/graphql`;

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: graphqlUrl,
      credentials: "include",
      headers: headers || {}, // Support for custom headers (like cookies for SSR)
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  headers?: Record<string, string>
) {
  // For SSR, always create a new client with headers
  // For client-side, reuse existing client
  const _apolloClient =
    typeof window === "undefined" || headers
      ? createApolloClient(headers)
      : apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient, 
  pageProps: { props?: Record<string, unknown> }
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}

export function useApollo(pageProps: Record<string, unknown>) {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as NormalizedCacheObject | null;
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

// Legacy export for backward compatibility
export const client = initializeApollo();
