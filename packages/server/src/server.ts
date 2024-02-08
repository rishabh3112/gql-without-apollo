import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers";
import { DbClient } from "./db/client";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

type Context = { dbClient: DbClient };

const typeDefs = gql`
  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
  }

  type Mutation {
    createBook(title: String!, authorId: ID!): Book!
    createAuthor(name: String!, dateOfBirth: Date): Author!
    deleteBook(id: ID!): Boolean
    deleteAuthor(id: ID!): Boolean
  }

  scalar Date

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    dateOfBirth: Date
    books: [Book!]!
  }
`;

export function graphqlHandler(): any {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    introspection: true,
  });

  return startServerAndCreateNextHandler<NextRequest, Context>(server, {
    context: async (req: NextRequest) => ({ req, dbClient: new DbClient() }),
  });
}
