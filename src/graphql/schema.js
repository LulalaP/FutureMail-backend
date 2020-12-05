/* eslint-disable import/no-named-as-default-member */
import { makeExecutableSchema, gql } from 'apollo-server';
import { merge } from 'lodash';

import Letter from './types/Letter';
import letterQuery from './queries/letter';
import createLetterMutation from './mutations/createLetter';
import User from './types/User';
import createUserMutation from './mutations/createUser';
import authorizeMutation from './mutations/authorize';
import usersQuery from './queries/users';
import authorizedUserQuery from './queries/authorizedUser';
import lettersQuery from './queries/letters';
import PageInfo from './types/PageInfo';
import LetterConnection from './types/LetterConnection';
import OrderDirection from './enums/OrderDirection';
import createReviewMutation from './mutations/createReview';
import Review from './types/Review';
import ReviewConnection from './types/ReviewConnection';
import UserConnection from './types/UserConnection';
import deleteReviewMutation from './mutations/deleteReview';
import DateTime from './scalars/DateTime';

const rootTypeDefs = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  DateTime.typeDefs,
  Letter.typeDefs,
  letterQuery.typeDefs,
  createLetterMutation.typeDefs,
  User.typeDefs,
  createUserMutation.typeDefs,
  authorizeMutation.typeDefs,
  usersQuery.typeDefs,
  authorizedUserQuery.typeDefs,
  lettersQuery.typeDefs,
  PageInfo.typeDefs,
  LetterConnection.typeDefs,
  OrderDirection.typeDefs,
  createReviewMutation.typeDefs,
  Review.typeDefs,
  ReviewConnection.typeDefs,
  UserConnection.typeDefs,
  deleteReviewMutation.typeDefs,
];

const resolvers = merge(
  DateTime.resolvers,
  Letter.resolvers,
  letterQuery.resolvers,
  createLetterMutation.resolvers,
  User.resolvers,
  createUserMutation.resolvers,
  authorizeMutation.resolvers,
  usersQuery.resolvers,
  authorizedUserQuery.resolvers,
  lettersQuery.resolvers,
  PageInfo.resolvers,
  LetterConnection.resolvers,
  OrderDirection.resolvers,
  createReviewMutation.resolvers,
  Review.resolvers,
  ReviewConnection.resolvers,
  UserConnection.resolvers,
  deleteReviewMutation.resolvers,
);

const createSchema = () => {
  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};

export default createSchema;
