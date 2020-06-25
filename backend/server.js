const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 8000
require('dotenv').config()
const articlesRouter = require('./routes/articles')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')

app.use(cors())
app.use(express.json())
app.use(articlesRouter)
app.use(usersRouter)
app.use(commentsRouter)

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) {
      console.log('MongoDB failed to connect')
    } else {
      console.log('MongoDB Connected.')
    }
  }
)

app.listen(PORT, () => {
  console.log(`Express server is listening on port: ${PORT}`)
})
