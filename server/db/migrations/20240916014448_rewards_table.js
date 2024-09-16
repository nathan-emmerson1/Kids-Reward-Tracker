/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('rewards', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('description').notNullable()
    table.integer('points_required').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('rewards')
}
