import { ApolloClient, HttpLink, InMemoryCache, type NormalizedCacheObject } from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (apolloClient !== null) {
    return apolloClient;
  }

  const link = new HttpLink();
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache,
    defaultOptions: {
      mutate: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
    link,
    queryDeduplication: true,
    uri: '/graphql',
  });

  apolloClient = client;

  return client;
}
