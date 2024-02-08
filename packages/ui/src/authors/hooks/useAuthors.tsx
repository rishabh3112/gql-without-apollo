//lib
import { gql, useQuery, QueryResult } from "@apollo/client";
// import { useQuery } from "@repo/ui/hooks/useQuery";
import { Author } from "../types";

const FETCH_DATA = gql`
  query Query {
    authors {
      id
      name
      dateOfBirth
    }
  }
`;

type TData = {
  authors: Author[];
};
type TVariables = {};

type ReturnType = Omit<QueryResult<TData, TVariables>, "data"> & {
  data?: Author[];
};

export const useAuthor = (): ReturnType => {
  const { data, ...rest } = useQuery<TData>(FETCH_DATA);

  return {
    ...rest,
    data: data?.authors,
  };
};
