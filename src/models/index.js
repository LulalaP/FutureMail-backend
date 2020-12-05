import User from './User';
import Review from './Review';
import Letter from './Letter';

export const bindModels = (knex) => {
  return {
    User: User.bindKnex(knex),
    Letter: Letter.bindKnex(knex),
    Review: Review.bindKnex(knex),
  };
};

export default bindModels;
