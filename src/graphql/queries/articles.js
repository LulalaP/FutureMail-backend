import { gql } from 'apollo-server';
import * as yup from 'yup';

import createPaginationQuery from '../../utils/createPaginationQuery';

export const typeDefs = gql`
  enum AllArticlesOrderBy {
    CREATED_AT
  }

  extend type Query {
    """
    Returns paginated articles.
    """
    articles(
      after: String
      first: Int
      orderDirection: OrderDirection
      orderBy: AllArticlesOrderBy
      searchKeyword: String
      userId: String
    ): ArticleConnection!
  }
`;

const articlesArgsSchema = yup.object({
  after: yup.string(),
  first: yup
    .number()
    .min(1)
    .max(30)
    .default(30),
  orderDirection: yup.string().default('DESC'),
  orderBy: yup.string().default('CREATED_AT'),
  searchKeyword: yup.string().trim(),
  author: yup.string().trim(),
});

const orderColumnByOrderBy = {
  CREATED_AT: 'createdAt',
};

const getLikeFilter = (value) => `%${value}%`;

export const resolvers = {
  Query: {
    articles: async (obj, args, { models: { Article } }) => {
      const normalizedArgs = await articlesArgsSchema.validate(args);

      const {
        first,
        orderDirection,
        after,
        orderBy,
        searchKeyword,
        userId,
      } = normalizedArgs;

      const orderColumn = orderColumnByOrderBy[orderBy];

      let query = Article.query();

      if (userId) {
        query = query.where({
          userId,
        });
      } else if (searchKeyword) {
        const likeFilter = getLikeFilter(searchKeyword);

        query = query
          .orWhere('title', 'like', likeFilter)
          .orWhere('titleEn', 'like', likeFilter);
      }

      return createPaginationQuery(() => query.clone(), {
        first,
        after,
        orderDirection: orderDirection.toLowerCase(),
        orderColumn,
      });
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
