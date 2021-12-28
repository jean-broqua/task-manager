const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  description: {
    type: String,
    require: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
})

module.exports = Task
