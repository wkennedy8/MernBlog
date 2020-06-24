const express = require('express')
const router = express.Router()
const Articles = require('../models/articles')
const auth = require('../middleware/auth')

// Get all articles
router.get('/articles', async (req, res) => {
  await Articles.find()
    .then(article => {
      res.json(article)
    })
    .catch(error => res.status(400).json(`Error: ${error}`))
})

// Add a new article
router.post('/add', auth, async (req, res) => {
  const newArticle = new Articles({
    ...req.body,
    author: req.user._id
  })

  try {
    newArticle.save()
    res.status(200).json(newArticle)
  } catch (error) {
    res.status(400).json(`Error ${error}`)
  }
})

// Get specific article

router.get('/:id', async (req, res) => {
  await Articles.findById(req.params.id)
    .then(article => res.json(article))
    .catch(error => res.status(400).json(`Error: ${error}`))
})

// Update specific article

router.patch('/update/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['article', 'title']
  const validUpdates = updates.every(update => allowedUpdates.includes(update))
  if (!validUpdates) {
    return res.status(400).json(`You cannot update the author.`)
  }

  try {
    const updatedArticle = await Articles.findOne({
      _id: req.params.id,
      author: req.user._id
    })
    if (!updatedArticle) {
      return res.status(404).send()
    }
    updates.forEach(update => (updatedArticle[update] = req.body[update]))
    await updatedArticle.save()
    res.send(updatedArticle)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete specific article

router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Articles.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    })
    if (!article) {
      res.status(404).json('Article not found.')
    }
    res.json(`Article: ${req.params.id} has been deleted.`)
  } catch (error) {
    res.status(400).json(`Error: ${error}`)
  }
})

module.exports = router
