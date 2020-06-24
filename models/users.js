const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Articles = require('./articles')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 4) {
          throw new Error('Password must be longer than 4 characters')
        }
      }
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email')
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.virtual('articles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'author'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '7 days'
  })
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email })
  if (!user) {
    throw new Error('No user found with email')
  }
  const verifiedMatch = await bcrypt.compare(password, user.password)
  if (!verifiedMatch) {
    throw new Error('Invalid credentials')
  }
  return user
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.pre('remove', async function (next) {
  const user = this
  await Articles.deleteMany({
    author: user._id
  })
  next()
})

const Users = model('User', userSchema)

module.exports = Users
