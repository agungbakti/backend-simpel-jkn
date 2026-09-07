exports.up = function (knex) {
  return knex.schema.createTable('data_simpel_jkn', (table) => {
    table.string('id').primary();
    table.string('user_id').nullable();
    table.date('date').notNullable();
    table.string('need_id').nullable();
    table.string('location_id').nullable();
    table.string('hospital_id').nullable();
    table.string('name').notNullable();
    table.string('no_nik').notNullable();
    table.string('no_hp').notNullable();
    table.string('email').notNullable();
    table.enu('hospital_referral', ['yes', 'no']).notNullable();
    table.enu('status', ['waiting', 'failed', 'success']).defaultTo('waiting');
    table.string('information_id').nullable();
    table.string('officer_name').nullable();

    table.timestamps(true, true);

    // Foreign keys
    table.foreign('user_id').references('id').inTable('users').onDelete('SET NULL');
    table.foreign('need_id').references('id').inTable('needs').onDelete('SET NULL');
    table.foreign('location_id').references('id').inTable('locations').onDelete('SET NULL');
    table.foreign('hospital_id').references('id').inTable('hospitals').onDelete('SET NULL');
    table.foreign('information_id').references('id').inTable('informations').onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('data_simpel_jkn');
};