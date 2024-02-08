//lib
import { useCallback } from "react";
import { gql, useMutation, ApolloError, MutationResult } from "@apollo/client";

type TData = void;
type TVariables = { id: string };

type Params = {
  onSuccess?: () => void;
  onFailure?: (e: ApolloError) => void;
};

type ReturnType = [(vars: TVariables) => void, MutationResult<TData>];

const DELETE_AUTHOR_MUTATION = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;

export const useDeleteAuthorMutation = ({
  onSuccess,
  onFailure,
}: Params): ReturnType => {
  const handleError = useCallback(
    (e: ApolloError) => {
      console.log({ message: e.message });
      onFailure?.(e);
    },
    [onFailure]
  );

  const [mutationFn, result] = useMutation<TData, TVariables>(
    DELETE_AUTHOR_MUTATION,
    {
      onCompleted: onSuccess,
      onError: handleError,
    }
  );

  const saveData = useCallback(
    (vars: TVariables) => mutationFn({ variables: vars }),
    [mutationFn]
  );

  return [saveData, result];
};
