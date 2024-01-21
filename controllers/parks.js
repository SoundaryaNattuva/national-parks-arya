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
    res.redirect('/parks')
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

function show(req, res){
  Park.findById(req.params.parkId)
  .populate("owner")
  .then(park => {
    res.render('parks/show', {
      park,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/parks")
  })
}


function edit(req, res){
  Park.findById(req.params.parkId)
  .then(park => {
      res.render('parks/edit'),
      park
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}


export {
  newParkPost as new,
  createPost as create,
  indexPage as index,
  show,
  edit,
}