import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/chores'
import { StatusCodes } from 'http-status-codes'

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

router.delete('/:id', checkJwt, async (req, res) => {
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

export default router
