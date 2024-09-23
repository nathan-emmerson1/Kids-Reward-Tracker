export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, email: 'parent1@example.com', auth_id: 1, name: 'Parent One' },
    { id: 2, email: 'parent2@example.com', auth_id: 2, name: 'Parent Two' },
  ])
}
