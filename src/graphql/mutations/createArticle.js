import { gql } from 'apollo-server';
import * as yup from 'yup';

const { v4: uuid } = require('uuid');

export const typeDefs = gql`
  input CreateArticleInput {
    title: String!
    titleEn: String!
    description: String!
    text: String!
  }

  extend type Mutation {
    """
    Create a new article.
    """
    createArticle(article: CreateArticleInput): Article
  }
`;

const createArticleInputSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .trim(),
  titleEn: yup
    .string()
    .required()
    .trim(),
  description: yup
    .string()
    .required()
    .max(1000)
    .trim(),
  text: yup
    .string()
    .max(5000)
    .required()
    .trim(),
});

export const resolvers = {
  Mutation: {
    createArticle: async (
      obj,
      args,
      { models: { Article }, authService },
    ) => {
      const userId = authService.assertIsAuthorized();

      const normalizedArticle = await createArticleInputSchema.validate(
        args.article,
        {
          stripUnknown: true,
        },
      );

      const id = uuid();

      await Article.query().insert({
        id,
        userId,
        title: normalizedArticle.title,
        titleEn: normalizedArticle.titleEn,
        description: normalizedArticle.description,
        text: normalizedArticle.text,
      });

      return Article.query().findById(id);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
