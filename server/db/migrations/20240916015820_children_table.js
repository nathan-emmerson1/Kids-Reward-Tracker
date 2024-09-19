/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('children', (table) => {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('name').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('children')
}
