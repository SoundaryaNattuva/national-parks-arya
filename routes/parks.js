import { Router } from 'express'
import *  as parksCtrl from '../controllers/parks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/parks/
router.get('/', isLoggedIn, parksCtrl.index)

//GET locahost:3000/parks/new
router.get ('/new', isLoggedIn, parksCtrl.new)

//GET localhost:3000/parks/:parkId
router.get('/:parkId', parksCtrl.show)

//GET localhost:3000/parks/:parkId/edit
router.get('/:parkId/edit', isLoggedIn, parksCtrl.edit)

//POST localhost:3000/parks/
router.post ('/', isLoggedIn, parksCtrl.create )

export {
  router
}