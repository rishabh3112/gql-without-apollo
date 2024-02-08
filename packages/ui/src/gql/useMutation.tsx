import { useMemo, useEffect, useState, useCallback } from "react";
import { ApolloError, QueryResult } from "@apollo/client";
import { print } from "graphql/language/printer";

// TODO: handle variables (ond other options) + query result
export const useMutation = <TData,>(mutation, { onCompleted, onError }) => {
  const [state, setState] = useState<QueryResult<TData>>({
    loading: true,
    error: undefined,
  } as any);

  const mutationText = useMemo(() => print(mutation), [mutation]);

  const callMutation = useCallback(
    async (options: any) => {
      const controller = new AbortController();
      // Can read url from a context (like Apollo Provider)
      const promise = fetch("/api/graphql", {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutationText, ...options }),
      }).then((res) => res.json());

      promise
        .then(({ data }) => {
          setState({ data, loading: false, error: undefined } as any);
          onCompleted?.();
        })
        .catch((error) => {
          setState({
            loading: false,
            error: new ApolloError({ clientErrors: [error] }),
          } as any);
          onError?.(new ApolloError({ clientErrors: [error] }));
        });

      return;
    },
    [mutationText]
  );

  return [callMutation, state];
};
