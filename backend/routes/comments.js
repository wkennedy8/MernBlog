const express = require('express')
const router = express.Router()
const Comments = require('../models/comments')
const Articles = require('../models/articles')

// Get all comments
router.get('/comments', async (req, res) => {
  await Comments.find()
    .then(comment => {
      res.json(comment)
    })
    .catch(error => res.status(400).json(`Error: ${error}`))
})

// Add a new comment
router.post('/comments/:articleId/add', async (req, res) => {
  try {
    const comment = new Comments(req.body)
    const savedComment = await comment.save()

    const article = await Articles.findById(req.params.articleId)
    article.comments.push(savedComment._id)
    const savedArticle = await article.save()
    res.json(savedArticle)
  } catch (error) {
    res.status(400).json(`Error: ${error}`)
  }
})

// Get all Comments for article

router.get('/:articleId/comments', async (req, res) => {
  try {
    const article = (await Articles.findById(req.params.articleId)).populate(
      'comments'
    )
    const commentIds = article.comments
    const commentPromises = commentIds.map(_id => {
      return Comments.findOne({ _id })
    })
    const comments = await Promise.all(commentPromises)
    res.json(comments)
  } catch (error) {
    res.status(400).json(`Error: ${error}`)
  }
})

module.exports = router
