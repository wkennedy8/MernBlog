const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')

//Create a new user
router.post('/users', async (req, res) => {
  const user = new Users(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (error) {
    res.status(400).json(`Error: ${error}`)
  }
})

//Login User
router.post('/login', async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    )
    const token = await user.generateAuthToken()
    res.json({ user, token })
  } catch (error) {
    res.status(400).json(`Error: ${error}`)
  }
})

//Logout User
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
    res.json({ message: 'Logged out!' })
  } catch (error) {
    res.status(400).json(`Error: ${error}`)
  }
})

module.exports = router
