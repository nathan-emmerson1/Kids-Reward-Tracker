import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/functions/chores'
import { StatusCodes } from 'http-status-codes'
import { ChoreData } from '../../models/chores'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const chore = await db.GetAllChores()
    res.json(chore)
    console.log(chore)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting chores' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    console.log('starting oof chore by id')
    const id = Number(req.params.id)
    const chore = await db.getChoreById(id)
    res.json(chore)
    console.log(chore)
  } catch (error) {
    res.status(500).json({ messege: 'error getting by id chore' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const removed = await db.deleteChore(id)
    if (removed) {
      res.sendStatus(StatusCodes.NO_CONTENT)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ messege: 'error removing chore' })
  }
})

function convertCamelToSnake(choreData: ChoreData) {
  return {
    name: choreData.name,
    description: choreData.description,
    frequency: choreData.frequency,
    created_at: choreData.createdAt, // Mapping to snake_case
    updated_at: choreData.updatedAt, // Mapping to snake_case
  }
}

router.post('/', async (req, res) => {
  try {
    const { name, description, frequency, createdAt, updatedAt } = req.body

    const choreData = convertCamelToSnake({
      name,
      description,
      frequency,
      createdAt,
      updatedAt,
    })
    const id = await db.AddChore(choreData)
    res
      .setHeader('addchore', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

export default router
