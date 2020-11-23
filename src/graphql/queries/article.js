import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    """
    Returns article by an id.
    """
    article(id: ID!): Article
  }
`;

export const resolvers = {
  Query: {
    article: async (obj, args, { dataLoaders: { articleLoader } }) =>
      articleLoader.load(args.id),
  },
};

export default {
  typeDefs,
  resolvers,
};
