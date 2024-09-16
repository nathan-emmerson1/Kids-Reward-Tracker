export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('rewards').del()

  // Inserts seed entries
  await knex('rewards').insert([
    {
      name: 'Sticker Pack',
      description: 'A set of fun stickers',
      points_required: 10,
    },
    {
      name: 'Extra Screen Time',
      description: 'An additional hour of screen time',
      points_required: 20,
    },
    {
      name: 'Toy Car',
      description: 'A small toy car for play',
      points_required: 30,
    },
  ])
}
