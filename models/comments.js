const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Articles = require('./articles')

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    date: { type: Date, default: Date.now(), required: true }
  },
  {
    timestamps: true
  }
)

const Comments = model('Comment', commentSchema)

module.exports = Comments
