
exports.up = function(knex) {
  return knex.schema.createTable('tokens', (table) => {
    table.string('id').primary();
    table
      .string('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('token').notNullable();
    table.string('expired_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tokens');
};
