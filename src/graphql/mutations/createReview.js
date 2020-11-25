import { gql } from 'apollo-server';
import * as yup from 'yup';

const { v4: uuid } = require('uuid');

export const typeDefs = gql`
  input CreateReviewInput {
    articleId: String!
    text: String!
  }

  extend type Mutation {
    """
    Creates a review for the article.
    """
    createReview(review: CreateReviewInput): Review
  }
`;

const createReviewInputSchema = yup.object().shape({
  articleId: yup
    .string()
    .required()
    .trim(),
  text: yup
    .string()
    .max(2000)
    .trim(),
});

export const resolvers = {
  Mutation: {
    createReview: async (
      obj,
      args,
      { models: { Review }, authService },
    ) => {
      const userId = authService.assertIsAuthorized();

      const normalizedReview = await createReviewInputSchema.validate(
        args.review,
        {
          stripUnknown: true,
        },
      );

      const id = uuid();

      await Review.query().insert({
        id,
        userId,
        articleId: normalizedReview.articleId,
        text: normalizedReview.text,
      });

      return Review.query().findById(id);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
