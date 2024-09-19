export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, email: 'parent1@example.com', name: 'Parent One' },
    { id: 2, email: 'parent2@example.com', name: 'Parent Two' },
  ])
}
