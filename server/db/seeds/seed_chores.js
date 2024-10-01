export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('chores').del()

  // Inserts seed entries
  await knex('chores').insert([
    {
      id: 1,

      children_id: 1,
      name: 'Do the dishes',
      description: 'Wash all dishes after dinner',
      frequency: 'daily',
      completed: false,
    },
    {
      id: 2,

      children_id: 2,
      name: 'Clean the room',
      description: 'Tidy up the room and make the bed',
      frequency: 'weekly',
      completed: false,
    },
    {
      id: 3,

      children_id: 3,
      name: 'Take out the trash',
      description: 'Dispose of all household trash',
      frequency: 'weekly',
      completed: false,
    },
  ])
}
