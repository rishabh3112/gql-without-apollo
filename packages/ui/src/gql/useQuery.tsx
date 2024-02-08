import { useMemo, useEffect, useState, useCallback, useRef } from "react";
import { ApolloError, QueryResult } from "@apollo/client";
import { print } from "graphql/language/printer";

export const useQuery = <TData,>(query) => {
  const [state, setState] = useState<QueryResult<TData>>({
    data: undefined,
    loading: true,
    error: undefined,
  } as any);
  const abortControllerRef = useRef(new AbortController());

  const queryText = useMemo(() => print(query), [query]);

  const callQuery = useCallback(() => {
    // TODO: find strategy to abort stale requests
    const promise = fetch("/api/graphql", {
      signal: abortControllerRef.current.signal,
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
  }, [queryText]);

  useEffect(() => {
    callQuery();
  }, [callQuery]);

  return { ...state, refetch: callQuery };
};
