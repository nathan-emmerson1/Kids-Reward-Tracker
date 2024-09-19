export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('children').del()

  // Inserts seed entries
  await knex('children').insert([
    { user_id: 1, name: 'Child One' },
    { user_id: 2, name: 'Child Two' },
  ])
}
