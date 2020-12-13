import { gql } from 'apollo-server';
import * as yup from 'yup';

const { v4: uuid } = require('uuid');

export const typeDefs = gql`
  input CreateLetterInput {
    title: String!,
    text: String!,
    sendTime: String!,
    author: String!,
    email: String!,
    setPrivate: Boolean!
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
    .max(200)
    .trim(),
  sendTime: yup
    .string()
    .required()
    .trim(),
  author: yup
    .string()
    .required()
    .trim(),
  email: yup
    .string()
    .required()
    .trim(),
  setPrivate: yup
    .boolean()
    .required(),
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
        text: normalizedLetter.text,
        sendTime: normalizedLetter.sendTime,
        author: normalizedLetter.author,
        email: normalizedLetter.email,
        setPrivate: normalizedLetter.setPrivate,
      });

      return Letter.query().findById(id);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
