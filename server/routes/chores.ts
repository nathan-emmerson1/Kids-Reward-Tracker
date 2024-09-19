import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/chores'

const router = Router()

router.use(checkJwt)

router.get('/', checkJwt, async (req, res) => {
  try {
    const chore = await db.GetAllChores()
    res.json(chore)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting chores' })
  }
})

router.get('/:id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params)
    const chore = await db.GetChoreById(id)
    res.json(chore)
  } catch (error) {
    res.status(500).json({ messege: 'error getting by id chore' })
  }
})
