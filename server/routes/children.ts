import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/children'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const children = await db.GetAllChildren()
    res.json(children)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting Children' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const children = await db.getChildrenById(id)
    res.json(children)

    console.log(children)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error geting kids by id' })
  }
})

export default router
