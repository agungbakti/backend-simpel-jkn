
exports.up = function(knex) {
  return knex.schema.createTable('hospitals', (table) => {
    table.string('id').primary();
    table.string('name_hospital').notNullable();
    table
      .string('district_hospital_id')
      .notNullable()
      .references('id')
      .inTable('district_hospitals')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('hospitals');
};
