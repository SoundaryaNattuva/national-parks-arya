import { Park } from '../models/park.js'

function newParkPost(req, res) {
  res.render('parks/new', {
  title: "Hello",
  })
}


function createPost (req,res){
req.body.owner = req.user.profile._id
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
      res.render('parks/edit',{
      park
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}


function deletePost(req, res){
  Park.findIdBy(req.params.id)
  .then (park => {
    if (park.owner.equals(req.user.profile._id)) {
      park.deleteOne()
      .then(() => {
        res.redirect('/parks')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function updatePost(req, res) {
  Park.findById(req.params.parkId)
  .then(park => {
    if (park.owner.equals(req.user.profile._id)) {
      park.updateOne(req.body)
      .then(()=> {
        res.redirect(`/parks/${park._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/parks`)
  })
}





export {
  newParkPost as new,
  createPost as create,
  indexPage as index,
  show,
  edit,
  deletePost as delete,
  updatePost as update,
}