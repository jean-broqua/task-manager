/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Exemple description'
    })
    .expect(201)

  // Assert that the task is added to the database
  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toEqual(false)
})
