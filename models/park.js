import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const parkSchema = new Schema({
  parkName: String,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  date: Date,
  route: String,
  companion: [String],
  trailGrub: [String],
  wildlife: [String],
  elevation: Number,
  comments: [commentSchema]
}, {
  timestamps: true
})

const tacoSchema = new Schema({
  name: String,
  tasty: Boolean,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  comments: [commentSchema]
}, {
  timestamps: true
})

const Taco = mongoose.model('Taco', tacoSchema)

export {
  Taco
}