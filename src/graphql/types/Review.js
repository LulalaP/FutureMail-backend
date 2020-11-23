import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Review {
    id: ID!
    user: User!
    article: Article!
    userId: String!
    articleId: String!
    createdAt: DateTime!
    text: String
  }
`;

export const resolvers = {
  Review: {
    user: async ({ userId }, args, { dataLoaders: { userLoader } }) =>
      userLoader.load(userId),
    article: (
      { articleId },
      args,
      { dataLoaders: { articleLoader } },
    ) => articleLoader.load(articleId),
  },
};

export default {
  typeDefs,
  resolvers,
};
