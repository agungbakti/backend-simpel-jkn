
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('no_hp').notNullable();
    table.string('role').notNullable();
    table.string('avatar_inisial').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
