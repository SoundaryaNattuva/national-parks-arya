import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page' })
})

router.get("/welcome", isLoggedIn, function (req, res) {
  res.render('welcome')
})

export {
  router
}
