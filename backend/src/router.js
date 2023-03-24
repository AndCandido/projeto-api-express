const express = require('express')
const router = express.Router()

const tasksControllers = require('./controllers/tasksController')
const tasksMiddlewares = require('./middlewares/tasksMiddlewares')
router.get('/tasks', tasksControllers.getAll)
router.post('/tasks', tasksMiddlewares.validateBody,tasksControllers.createTask)

module.exports = router