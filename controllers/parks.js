import { Park } from '../models/park.js'
import { Profile } from '../models/profile.js'

function newParkPost(req, res) {
  res.render('parks/new', {
  title: "Hello",
  })
}

function createPost (req,res){
req.body.owner = req.user.profile._id
Park.create(req.body)
  .then(park => {
    Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.parksVisited.push(park._id)
        profile.save()
        .then(() => {
          res.redirect('/parks')
        })
      })
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
  .populate([
    {path: "owner"},
    {path: "comments.author"}
  ])
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
    const parkDate = park.date.toISOString().slice(0,16)
      res.render('parks/edit',{
      park,
      parkDate: parkDate
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function deletePost(req, res){
  Park.findById(req.params.parkId)
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

function addComment(req,res){
  Park.findById(req.params.parkId)
  .then(park => {
    req.body.author = req.user.profile._id
    park.comments.push(req.body)
    park.save()
    .then(()=> {
      res.redirect(`/parks/${park._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/parks')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function editComment(req, res){
  Park.findById(req.params.parkId)
  .then(park => {
    const comment = park.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      res.render('parks/editComment', {
        park, 
        comment,
        title: 'Update Comment'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}


function updateComment(req, res){
  Park.findById(req.params.parkId)
  .then(park => {
    const comment = park.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      comment.set(req.body)
      park.save()
      .then(() => {
        res.redirect(`/parks/${park._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/parks')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}

function deleteComment(req, res){
  Park.findById(req.params.parkId)
  .then(park => {
    const comment = park.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      park.comments.remove(comment)
      park.save()
      .then(() => {
        res.redirect(`/parks/${park._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/parks')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/parks')
  })
}


function showBadges(req, res){
  Profile.findById(req.user.profile._id)
  .populate('parksVisited')
  .then(profile => {
    Park.find({})
    .then(parks => {
      console.log(profile)
      res.render('parks/badges', {
        profile,
        allParks: parks
      })
    })

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
  addComment,
  editComment,
  updateComment,
  deleteComment,
  showBadges
}