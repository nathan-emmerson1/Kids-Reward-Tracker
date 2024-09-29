export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('children').del()

  // Inserts seed entries
  await knex('children').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Child One',
      username: 'tommyhash',
      password: 'tommyfish',
    },
    {
      id: 2,
      user_id: 2,
      name: 'Child Two',
      username: 'billyhash',
      password: 'billyfinsih',
    },
    {
      id: 3,
      user_id: 3,
      name: 'Child Three',
      username: 'funnyhash',
      password: 'funnyfish',
    },
  ])
}
