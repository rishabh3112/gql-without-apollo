import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Authors } from "@repo/ui/authors/Authors";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default function Page(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen w-full flex justify-center">
        <div className="flex flex-col gap-2 w-3/4 p-5 m-5 border-black rounded">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Authors ✍🏽 <i>with apollo</i>
          </h1>
          <Authors />
        </div>
      </div>
    </ApolloProvider>
  );
}
