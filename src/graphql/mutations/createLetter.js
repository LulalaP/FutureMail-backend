import { gql } from 'apollo-server';
import * as yup from 'yup';

const { v4: uuid } = require('uuid');

export const typeDefs = gql`
  input CreateLetterInput {
    title: String!
    titleEn: String!
    description: String!
    text: String!
  }

  extend type Mutation {
    """
    Create a new letter.
    """
    createLetter(letter: CreateLetterInput): Letter
  }
`;

const createLetterInputSchema = yup.object().shape({
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
    createLetter: async (
      obj,
      args,
      { models: { Letter }, authService },
    ) => {
      const userId = authService.assertIsAuthorized();

      const normalizedLetter = await createLetterInputSchema.validate(
        args.letter,
        {
          stripUnknown: true,
        },
      );

      const id = uuid();

      await Letter.query().insert({
        id,
        userId,
        title: normalizedLetter.title,
        titleEn: normalizedLetter.titleEn,
        description: normalizedLetter.description,
        text: normalizedLetter.text,
      });

      return Letter.query().findById(id);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
