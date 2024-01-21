import { Router } from 'express'
import *  as parksCtrl from '../controllers/parks.js'

const router = Router()


//GET locahost:3000/parks/new
router.get ('/new', parksCtrl.new)


export {
  router
}