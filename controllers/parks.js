import { Park } from '../models/park.js'

function newParkPost(req, res) {
  res.render('parks/new', {
  title: "Hello",
  })
}


function createPost (req,res){
  park.create(req.body)
  .then(parks => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function indexPage(req,res){
  res.render("🏞️🏞️🏞️🏞️🏞️")
}

export {
  newParkPost as new,
  createPost as create,
  indexPage as index,
}