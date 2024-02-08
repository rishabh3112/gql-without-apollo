import { queryResolvers } from "./query.resolvers";
import { mutationResolvers } from "./mutation.resolvers";
import { bookResolvers } from "./book.resolvers";
import { authorResolvers } from "./author.resolvers";

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Book: bookResolvers,
  Author: authorResolvers,
};
