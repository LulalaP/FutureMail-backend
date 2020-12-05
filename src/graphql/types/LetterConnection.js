import { gql } from 'apollo-server';

export const typeDefs = gql`
  type LetterEdge {
    cursor: String!
    node: Letter!
  }

  type LetterConnection {
    pageInfo: PageInfo!
    edges: [LetterEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
