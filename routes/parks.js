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

//DELETE localhost:3000/parks/:parkId
router.delete('/:parkId', isLoggedIn, parksCtrl.delete)

//PUT localhost:3000/parks/parkId/
router.put('/:parkId', isLoggedIn, parksCtrl.update)

//POST localhost:3000/parks/:parkId/comments
router.post('/:parkId/comments', isLoggedIn, parksCtrl.addComment)

// GET localhost:3000/parks/:parkId/comments/:commentId/edit
router.get('/:parkId/comments/:commentId/edit', isLoggedIn, parksCtrl.editComment)

// PUT localhost:3000/parks/:parkId/comments/:commentId
router.put('/:parkId/comments/:commentId', isLoggedIn, parksCtrl.updateComment)

//DELETE localhost:3000/parks/:parkId/comments/:commentId
router.delete('/:parkId/comments/:commentId', isLoggedIn, parksCtrl.deleteComment)


export {
  router
}