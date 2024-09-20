export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('chores').del()

  // Inserts seed entries
  await knex('chores').insert([
    {
      id: 1,
      name: 'Do the dishes',
      description: 'Wash all dishes after dinner',
      frequency: 'daily',
    },
    {
      id: 2,
      name: 'Clean the room',
      description: 'Tidy up the room and make the bed',
      frequency: 'weekly',
    },
    {
      id: 3,
      name: 'Take out the trash',
      description: 'Dispose of all household trash',
      frequency: 'weekly',
    },
  ])
}
