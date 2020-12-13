const { add } = require('date-fns');

const oneHour = 1000 * 60 * 60;
const { v4: uuid } = require('uuid');

const letters = [
  '亲爱的我自己，你好哇。不知道你现在在做什么呢，还那么快乐吗，还在坚守自己的梦想和使命吗？不管遇到什么样的困难，我都希望你能勇往直前，曙光总会来临的，相信我，相信数学的力量吧！',
  '亲爱的我自己，你好哇。祝你像现在的我一样开心。',
  '亲爱的我自己，你好哇。坚定地去做你想要做的事吧！',
  '亲爱的我自己，你好哇。加油！',
  '亲爱的我自己，你好哇。如果你看到这封信，给身边那个你爱的人一个拥抱吧',
  '亲爱的我自己，你好哇。我是来恭喜你的。我知道你经历了现在的我难以想象的困难，接受了诸多挑战，也做出了很了不起的事情。你收获的一切都源于你付出的努力，都是你应得的。所以恭喜你。我知道你一定会办到的，因为我就是你。',
  '亲爱的我自己，你好哇。如果你需要拥抱我就给你一个拥抱！如果你需要鼓掌我就给你鼓掌！如果你需要陪伴我就给你陪伴！',
];

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

const userId = 'bbe42984-051b-4a01-b45d-b8d29c32200c';

const createColumns = (letterTitle, letterAuthor) => ({
  id: uuid(),
  user_id: userId,
  title: letterTitle,
  author: letterAuthor,
  email: 'example@gmail.com',
});

exports.seed = async (knex) => {
  await knex('letters').del();

  await knex('letters').insert([
    {
      text: letters[0],
      sendTime: add(new Date(), { years: 1 }),
      setPrivate: false,
      ...createColumns('一封来自2020年的信', 'Philo'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      text: letters[1],
      sendTime: add(new Date(), { years: 2 }),
      setPrivate: false,
      ...createColumns('一封来自2020年的信', 'Philo'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      text: letters[2],
      sendTime: add(new Date(), { years: 3 }),
      setPrivate: false,
      ...createColumns('一封来自2020年的信', 'Philo'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      text: letters[3],
      sendTime: add(new Date(), { years: 4 }),
      setPrivate: false,
      ...createColumns('一封来自2020年的信', 'Philo'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      text: letters[4],
      sendTime: add(new Date(), { years: 5 }),
      setPrivate: false,
      ...createColumns('一封来自2020年的信', 'Philo'),
      ...createDateColumns(new Date(Date.now() - 5 * oneHour)),
    },
    {
      text: letters[5],
      sendTime: add(new Date(), { years: 10 }),
      setPrivate: false,
      ...createColumns('一封来自2020年的信', 'Philo'),
      ...createDateColumns(new Date(Date.now() - 6 * oneHour)),
    },
    {
      text: letters[6],
      sendTime: add(new Date(), { years: 10 }),
      setPrivate: true,
      ...createColumns('一封来自2020年的信(隐藏)', 'Philo'),
      ...createDateColumns(new Date(Date.now() - 7 * oneHour)),
    },
  ]);
};
