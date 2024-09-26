export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('children').del()

  // Inserts seed entries
  await knex('children').insert([
    { id: 1, user_id: 1, name: 'Child One' },
    { id: 2, user_id: 2, name: 'Child Two' },
    { id: 3, user_id: 3, name: 'Child Three' },
  ])
}
