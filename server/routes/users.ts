import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import { StatusCodes } from 'http-status-codes'
import * as db from '../db/functions/users'

const router = Router()

router.use(checkJwt)

router.get('/', async (req, res) => {
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
