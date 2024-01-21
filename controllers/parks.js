import { Park } from '../models/park.js'

function newParkPost(req, res) {
  res.render('parks/new', {
  title: "Hello",
  })
}


function createPost (req,res){
Park.create(req.body)
  .then(parks => {
    res.redirect('/parks')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function indexPage(req,res){
  console.log("👔")
  Park.find({})
  .then (parks => {
    res.render('parks/index', {
      parks,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  newParkPost as new,
  createPost as create,
  indexPage as index,
}