//lib
import { useCallback } from "react";
import { gql, useMutation, ApolloError, MutationResult } from "@apollo/client";

type TData = void;
type TVariables = { name: string; dateOfBirth?: string };

type Params = {
  onSuccess?: () => void;
  onFailure?: (e: ApolloError) => void;
};

type ReturnType = [(vars: TVariables) => void, MutationResult<TData>];

const CREATE_AUTHOR_MUTATION = gql`
  mutation createAuthor($name: String!, $dateOfBirth: Date) {
    createAuthor(name: $name, dateOfBirth: $dateOfBirth) {
      id
    }
  }
`;

export const useAddAuthorMutation = ({
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
    CREATE_AUTHOR_MUTATION,
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
