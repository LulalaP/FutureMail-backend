const oneHour = 1000 * 60 * 60;
const { v4: uuid } = require('uuid');

const loremIpsum =
  'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.';

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

const userId = 'bbe42984-051b-4a01-b45d-b8d29c32200c';

const createColumns = (titleZh, titleEn) => ({
  id: uuid(),
  user_id: userId,
  title: titleZh,
  title_en: titleEn,
});

exports.seed = async (knex) => {
  await knex('articles').del();

  await knex('articles').insert([
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('jaredpalmer', 'formik'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('async-library', 'react-async'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('rzwitserloot', 'lombok'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('rails', 'rails'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('django', 'django'),
      ...createDateColumns(new Date(Date.now() - 5 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('apollographql', 'apollo-client'),
      ...createDateColumns(new Date(Date.now() - 6 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('reduxjs', 'redux'),
      ...createDateColumns(new Date(Date.now() - 7 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('spring-projects', 'spring-framework'),
      ...createDateColumns(new Date(Date.now() - 8 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('zeit', 'next.js'),
      ...createDateColumns(new Date(Date.now() - 9 * oneHour)),
    },
    {
      description: 'First',
      text: loremIpsum,
      ...createColumns('zeit', 'swr'),
      ...createDateColumns(new Date(Date.now() - 10 * oneHour)),
    },
  ]);
};
