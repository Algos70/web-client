import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";


export const client = new ApolloClient({
  link: new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,  
  credentials: 'include'                       
}),
  cache: new InMemoryCache(),
});