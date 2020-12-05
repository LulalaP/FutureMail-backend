import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Review {
    id: ID!
    user: User!
    letter: Letter!
    userId: String!
    letterId: String!
    createdAt: DateTime!
    text: String
  }
`;

export const resolvers = {
  Review: {
    user: async ({ userId }, args, { dataLoaders: { userLoader } }) =>
      userLoader.load(userId),
    letter: (
      { letterId },
      args,
      { dataLoaders: { letterLoader } },
    ) => letterLoader.load(letterId),
  },
};

export default {
  typeDefs,
  resolvers,
};
