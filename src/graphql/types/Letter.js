import { gql } from 'apollo-server';
import * as yup from 'yup';

import createPaginationQuery from '../../utils/createPaginationQuery';

export const typeDefs = gql`
  type Letter {
    id: ID!
    userId: String!
    user: User!
    createdAt: DateTime!
    reviews(first: Int, after: String): ReviewConnection!
    reviewCount: Int
    likesCount: Int
    title: String!
    text: String!,
    sendTime: DateTime!,
    author: String!,
    email: String!,
    setPrivate: Boolean!
  }
`;

const reviewsArgsSchema = yup.object({
  after: yup.string(),
  first: yup
    .number()
    .min(1)
    .max(30)
    .default(30),
});

export const resolvers = {
  Letter: {
    user: ({ userId }, args, { dataLoaders: { userLoader } }) => {
      return userLoader.load(userId);
    },
    reviews: async (obj, args, { models: { Review } }) => {
      const normalizedArgs = await reviewsArgsSchema.validate(args);

      return createPaginationQuery(
        () =>
          Review.query().where({
            letterId: obj.id,
          }),
        {
          orderColumn: 'createdAt',
          orderDirection: 'desc',
          first: normalizedArgs.first,
          after: normalizedArgs.after,
        },
      );
    },
    reviewCount: (
      { id },
      args,
      { dataLoaders: { letterReviewCountLoader } },
    ) => letterReviewCountLoader.load(id),
  },
};

export default {
  typeDefs,
  resolvers,
};
