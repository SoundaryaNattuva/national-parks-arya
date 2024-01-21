// import { Park } from '../models/park.js'

function newParkPost(req, res) {
  res.render('parks/new', {
  title: "Hello",
  })
}

export {
  newParkPost as new,
}