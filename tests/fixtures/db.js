const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const jwt = require('jsonwebtoken')

// Dummy user data
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Test Name',
  email: 'test@test.com',
  password: 'password777!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Second Test Name',
  email: 'test2@test.com',
  password: 'password444!',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }
  ]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Test Task',
  completed: false,
  owner: userOne._id
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second Test Task',
  completed: true,
  owner: userOne._id
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third Test Task',
  completed: true,
  owner: userTwo._id
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  userOneId,
  userOne,
  setupDatabase
}
