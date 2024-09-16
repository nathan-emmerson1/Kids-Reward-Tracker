export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('chores').del()

  // Inserts seed entries
  await knex('chores').insert([
    {
      name: 'Do the dishes',
      description: 'Wash all dishes after dinner',
      frequency: 'daily',
    },
    {
      name: 'Clean the room',
      description: 'Tidy up the room and make the bed',
      frequency: 'weekly',
    },
    {
      name: 'Take out the trash',
      description: 'Dispose of all household trash',
      frequency: 'weekly',
    },
  ])
}
