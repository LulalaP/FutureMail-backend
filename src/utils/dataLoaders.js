/* eslint-disable implicit-arrow-linebreak */
import DataLoader from 'dataloader';
import {
  camelCase, isArray, find, zipObject,
} from 'lodash';

const jsonCacheKeyFn = (value) => JSON.stringify(value);

const createModelLoader = (Model) =>
  new DataLoader(
    async (ids) => {
      const idColumns = isArray(Model.idColumn)
        ? Model.idColumn
        : [Model.idColumn];

      const camelCasedIdColumns = idColumns.map((id) => camelCase(id));

      const results = await Model.query().findByIds(ids);

      return ids.map(
        (id) =>
          find(
            results,
            zipObject(camelCasedIdColumns, isArray(id) ? id : [id]),
          ) || null,
      );
    },
    {
      cacheKeyFn: jsonCacheKeyFn,
    },
  );

const createLetterReviewCountLoader = (Review) =>
  new DataLoader(async (letterIds) => {
    const reviews = await Review.query()
      .whereIn('letterId', letterIds)
      .count('*', { as: 'reviewsCount' })
      .groupBy('letterId')
      .select('letterId');

    return letterIds.map((id) => {
      const review = reviews.find(({ letterId }) => letterId === id);

      return review ? review.reviewsCount : 0;
    });
  });

const createUserReviewCountLoader = (Review) =>
  new DataLoader(async (userIds) => {
    const reviews = await Review.query()
      .whereIn('userId', userIds)
      .count('*', { as: 'reviewsCount' })
      .groupBy('userId')
      .select('userId');

    return userIds.map((id) => {
      const review = reviews.find(({ userId }) => userId === id);

      return review ? review.reviewsCount : 0;
    });
  });

export const createDataLoaders = ({ models }) => {
  return {
    letterLoader: createModelLoader(models.Letter),
    userLoader: createModelLoader(models.User),
    reviewLoader: createModelLoader(models.Review),
    letterReviewCountLoader: createLetterReviewCountLoader(
      models.Review,
    ),
    userReviewCountLoader: createUserReviewCountLoader(models.Review),
  };
};

export default createDataLoaders;
