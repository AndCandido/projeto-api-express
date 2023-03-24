const express = require('express')
const router = express.Router()

const tasksControllers = require('./controllers/tasksController')

router.get('/tasks', tasksControllers.getAll)
router.post('/tasks', tasksControllers.createTask)

module.exports = router