import { useSpaceX } from "@repo/ui/hooks/useSpaceX";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache(),
});

const SpaceX = (): JSX.Element => {
  const { data, loading } = useSpaceX();

  return <main>{loading ? "loading" : JSON.stringify(data)}</main>;
};

export default function Page(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <SpaceX />
    </ApolloProvider>
  );
}
