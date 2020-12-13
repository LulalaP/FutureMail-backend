/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('letters', (table) => {
    table.text('id').primary();
    table
      .text('user_id')
      .references('users.id')
      .onDelete('cascade');
    table.text('title');
    table.text('author');
    table.text('email');
    table.boolean('set_private').notNullable().defaultTo(false);
    table.text('text');
    table.timestamp('sent_at');
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index(['id', 'title', 'user_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('letters');
};
