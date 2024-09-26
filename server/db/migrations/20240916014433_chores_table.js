/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('chores', (table) => {
    table.increments('id').primary()
    table
      .integer('children_id')
      .unsigned()
      .references('id')
      .inTable('children')
      .onDelete('CASCADE')
    table.string('name').notNullable()

    table.string('description').notNullable()
    table.enu('frequency', ['daily', 'weekly', 'monthly']).notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('chores')
}
