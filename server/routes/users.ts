import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import { StatusCodes } from 'http-status-codes'
import * as db from '../db/functions/users'
import * as children from '../db/functions/children'
import { AddChore } from '../db/functions/chores'
import { addReward } from '../db/functions/rewards'

const router = Router()

router.use(checkJwt)

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

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { userId, name, createdAt, updatedAt } = req.body
    const id = await children.addChildren({
      userId,
      name,
      createdAt,
      updatedAt,
    })
    res
      .setHeader('addChild', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { name, description, frequency, createdAt, updatedAt } = req.body
    const id = await AddChore({
      name,
      description,
      frequency,
      createdAt,
      updatedAt,
    })
    res
      .setHeader('addchore', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { name, description, pointsRequired, createdAt, updatedAt } = req.body
    const id = await addReward({
      name,
      description,
      pointsRequired,
      createdAt,
      updatedAt,
    })
    res
      .setHeader('Add Reward', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

export default router
