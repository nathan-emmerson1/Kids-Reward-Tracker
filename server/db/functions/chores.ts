import db from '../connection'
import { Chore, ChoreData } from '../../../models/chores'

export async function GetAllChores() {
  const chore = await db('chores').select(
    'id as id',
    'children_id as childrenId',
    'name as name',
    'description as description',
    'frequency as frequency',
    'created_at as createdAt',
    'updated_at as updatedAt',
  )

  return chore as Chore[]
}

export async function getChoreById(id: number) {
  const chore = await db('chores').where({ id }).select().first()
  return chore as Chore
}

export async function AddChore(data: ChoreData) {
  const [id] = await db('chores').insert(data)
  return id
}

export async function getChoreByChildrenId(childrenId: number) {
  const chore = await db('chores')
    .join('children', 'chores.children_id', '=', 'children.id')
    .where('children_id', childrenId)
    .select(
      'chores.id as id',
      'chores.children_id as childrenId',
      'chores.name as name',
      'chores.completed as completed',
      'chores.description as description',
      'chores.frequency as frequency',
      'chores.created_at as createdAt',
      'chores.updated_at as updatedAt',
    )

  return chore
}

export async function updateChoreStatusByChildrenId(
  childrenId: number,
  status: boolean,
) {
  try {
    const chore = await db('chores')
      .where('id', childrenId)
      .update({ completed: status })
    console.log(chore)
    return chore
  } catch (err) {
    return console.log('there was a errro', err)
  }
}

export async function deleteChore(id: number): Promise<number> {
  const chore = await db('chores').where({ id }).delete()

  return chore
}
