import { useMemo, useEffect, useState } from "react";
import { ApolloError, QueryResult } from "@apollo/client";
import { print } from "graphql/language/printer";

// TODO: handle variables (ond other options) + query result
export const useQuery = <TData,>(query) => {
  const [state, setState] = useState<QueryResult<TData>>({
    data: undefined,
    loading: true,
    error: undefined,
  } as any);

  const queryText = useMemo(() => print(query), [query]);

  useEffect(() => {
    const controller = new AbortController();
    // Can read url from a context (like Apollo Provider)
    const promise = fetch("https://spacex-production.up.railway.app/", {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryText }),
    }).then((res) => res.json());

    promise
      .then(({ data }) => {
        setState({ data, loading: false, error: undefined } as any);
      })
      .catch((error) => {
        setState({
          data: undefined,
          loading: false,
          error: new ApolloError({ clientErrors: [error] }),
        } as any);
      });

    return () => {
      controller.abort();
    };
  }, [queryText]);

  return state;
};
