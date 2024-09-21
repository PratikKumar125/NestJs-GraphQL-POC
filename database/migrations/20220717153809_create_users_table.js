/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const migration = await knex.schema.createTable('users', function (table) {
    table.bigIncrements('id');
    table.uuid('name').index().notNullable();
    table.string('email').index().notNullable();
  });
  await knex.raw(onUpdateTrigger('users'));
  return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
