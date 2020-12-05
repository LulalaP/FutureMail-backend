/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.text('id').primary();
    table
      .text('user_id')
      .references('users.id')
      .onDelete('cascade');
    table
      .text('letter_id')
      .references('letters.id')
      .onDelete('cascade');
    table.text('text');
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index(['user_id', 'letter_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
};
