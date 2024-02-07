//lib
import { gql, useQuery, QueryResult } from "@apollo/client";
// At build time we will convert above to below imports through swc plugin
// import { gql, QueryResult } from "@apollo/client";
// import { useQuery } from "@repo/ui/hooks/useQuery";

const FETCH_DATA = gql`
  query ExampleQuery {
    company {
      ceo
      coo
      cto
      headquarters {
        address
        city
        state
      }
    }
  }
`;

type SpaceX = { ceo: string };

type TData = {
  company: SpaceX;
};
type TVariables = {};

type ReturnType = Omit<QueryResult<TData, TVariables>, "data"> & {
  data?: SpaceX;
};

export const useSpaceX = (): ReturnType => {
  const { data, ...rest } = useQuery<TData>(FETCH_DATA);

  return {
    ...rest,
    data: data?.company,
  };
};
