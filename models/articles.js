const { Schema, model } = require('mongoose')
const moment = require('moment')

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { usePushEach: true }
)

const Articles = model('Article', articleSchema)

module.exports = Articles
