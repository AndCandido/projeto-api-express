const express = require('express')
const router = express.Router()

const tasksControllers = require('./controllers/tasksController')
const tasksMiddlewares = require('./middlewares/tasksMiddlewares')

router.get('/tasks', tasksControllers.getAll)
router.post('/tasks', tasksMiddlewares.validateFieldTitle,tasksControllers.createTask)
router.delete('/tasks/:id', tasksControllers.deleteTask)
router.put('/tasks/:id', 
    tasksMiddlewares.validateFieldTitle, 
    tasksMiddlewares.validateFieldStatus,  
    tasksControllers.updateTask
)

module.exports = router