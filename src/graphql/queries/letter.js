import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    """
    Returns letter by an id.
    """
    letter(id: ID!): Letter
  }
`;

export const resolvers = {
  Query: {
    letter: async (obj, args, { dataLoaders: { letterLoader } }) =>
      letterLoader.load(args.id),
  },
};

export default {
  typeDefs,
  resolvers,
};
