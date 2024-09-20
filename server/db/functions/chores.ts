import db from '../connection'
import { Chore, ChoreData } from '../../../models/chores'

export async function GetAllChores() {
  const chore = await db('chores').select(
    'name as name',
    'description as description',
    'frequency as frequency',
    'created_at as createdAt',
    'updated_at as updatedAt',
  )
  console.log(chore)
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

export async function deleteChore(id: number) {
  const chore = await db('chores').where({ id }).delete()
  return chore
}
