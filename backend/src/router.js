const express = require('express')
const router = express.Router()

const tasksControllers = require('./controllers/tasks')

router.get('/tasks', tasksControllers.getAll)
router.post('/tasks', tasksControllers.createTask)

module.exports = router