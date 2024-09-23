import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import { StatusCodes } from 'http-status-codes'
import * as db from '../db/functions/users'
import * as children from '../db/functions/children'
import { AddChore, deleteChore } from '../db/functions/chores'
import { addReward, deleteReward } from '../db/functions/rewards'
import { User, UserData } from '../../models/users'

const router = Router()

router.get('/', checkJwt, async (req, res) => {
  try {
    const user = await db.getAllUser()
    res.json(user)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ messege: 'something went wrong with  getting users' })
  }
})

router.get('/:id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params)
    const user = await db.getUserById(id)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'Error getting user By id' })
  }
})

function convertCamelToSnake(userData: UserData) {
  return {
    auth_id: userData.authId,
    email: userData.email,
    name: userData.name,

    created_at: userData.createdAt, // Mapping to snake_case
    updated_at: userData.updatedAt, // Mapping to snake_case
  }
}

router.post('/', async (req, res) => {
  try {
    const { authId, name, email, createdAt, updatedAt } = req.body

    const userData = convertCamelToSnake({
      authId,
      email,
      name,
      createdAt,
      updatedAt,
    })
    const addUser = await db.addUser(userData)
    res
      .setHeader('addeuser', `${req.baseUrl}/${addUser}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

export default router
