
exports.up = function(knex) {
  return knex.schema.createTable('district_hospitals', (table) => {
    table.string('id').primary();
    table.string('name_district_hospital').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('district_hospitals');
};
