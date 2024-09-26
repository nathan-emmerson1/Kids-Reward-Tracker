export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('rewards').del()

  // Inserts seed entries
  await knex('rewards').insert([
    {
      id: 1,

      children_id: 1,
      name: 'Sticker Pack',
      description: 'A set of fun stickers',
      points_required: 10,
    },
    {
      id: 2,

      children_id: 2,
      name: 'Extra Screen Time',
      description: 'An additional hour of screen time',
      points_required: 20,
    },
    {
      id: 3,

      children_id: 3,
      name: 'Toy Car',
      description: 'A small toy car for play',
      points_required: 30,
    },
  ])
}
