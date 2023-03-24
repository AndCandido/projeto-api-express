const express = require('express')
const router = express.Router()

const tasksControllers = require('./controllers/tasks')

router.get('/tasks', tasksControllers.index)

module.exports = router