const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validade(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email.')
      }
    }
  },
  password: {
    type: String,
    trim: true,
    minLength: 7,
    require: true,
    validade(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the word password')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validade(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number.')
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
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user.id.toString() }, 'thisisarandomstring')
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// Authenticate the user by the provided credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Hashs the password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
