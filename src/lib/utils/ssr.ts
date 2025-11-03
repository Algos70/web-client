import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { initializeApollo, addApolloState } from "../graphql/client";
import { DocumentNode } from "graphql";

interface SSRQueryConfig {
  query: DocumentNode;
  variables?: (context: GetServerSidePropsContext) => Record<string, unknown>;
  propName?: string;
  required?: boolean;
}

interface SSRConfig {
  queries: SSRQueryConfig[];
  requireAuth?: boolean;
  skipAuthErrors?: boolean; // Skip auth errors and continue with empty data
}

export function createSSRHandler(config: SSRConfig): GetServerSideProps<Record<string, unknown>> {
  return async (context) => {
    // Use unified Apollo Client with cookie forwarding
    const headers = {
      cookie: context.req.headers.cookie || "",
    };
    const apolloClient = initializeApollo(null, headers);
    const props: Record<string, unknown> = {};

    try {
      // Execute all queries in parallel
      const queryPromises = config.queries.map(async (queryConfig) => {
        const variables = queryConfig.variables
          ? queryConfig.variables(context)
          : {};

        try {
          const { data } = await apolloClient.query({
            query: queryConfig.query,
            variables,
          });

          // Extract the first property from data if no specific propName is provided
          const dataKey = Object.keys(data as Record<string, unknown>)[0];
          const propName = queryConfig.propName || `${dataKey}Data`;

          return { propName, data: (data as Record<string, unknown>)[dataKey], error: null };
        } catch (error: unknown) {
          // Handle authentication errors
          const errorMessage = error instanceof Error ? error.message : "";
          const isAuthError =
            errorMessage.includes("Authentication") ||
            errorMessage.includes("Unauthorized");

          if (isAuthError && config.skipAuthErrors) {
            console.warn(`SSR: Skipping auth error for query`, errorMessage);
            const dataKey = "unknown";
            const propName = queryConfig.propName || `${dataKey}Data`;
            return { propName, data: null, error };
          }

          throw error;
        }
      });

      const results = await Promise.all(queryPromises);

      // Add all results to props
      results.forEach(({ propName, data }) => {
        props[propName] = data;
      });

      // Check if any required queries failed
      const hasRequiredFailures = config.queries.some((queryConfig, index) => {
        return queryConfig.required && !results[index].data;
      });

      if (hasRequiredFailures) {
        return {
          notFound: true,
        };
      }

      return addApolloState(apolloClient, {
        props,
      }) as { props: Record<string, unknown> };
    } catch (error) {
      console.error("SSR Error:", error);

      // If any query is required, return 404
      const hasRequiredQueries = config.queries.some((q) => q.required);
      if (hasRequiredQueries) {
        return {
          notFound: true,
        };
      }

      // Otherwise return empty props
      return addApolloState(apolloClient, {
        props,
      }) as { props: Record<string, unknown> };
    }
  };
}

// Common variable extractors
export const extractSlug = (context: GetServerSidePropsContext) => ({
  slug: context.params?.slug as string,
});

export const extractCategoryPagination = (
  context: GetServerSidePropsContext
) => ({
  slug: context.params?.slug as string,
  page: parseInt(context.query.page as string) || 1,
  limit: 5,
  inStockOnly: true,
});

export const extractProductFilters = (context: GetServerSidePropsContext) => ({
  page: parseInt(context.query.page as string) || 1,
  limit: 10,
  search: context.query.search as string,
  categoryId: context.query.categoryId as string,
  inStockOnly: true,
});

export const extractCategoryFilters = (context: GetServerSidePropsContext) => ({
  page: parseInt(context.query.page as string) || 1,
  limit: 10,
  search: context.query.search as string,
});
