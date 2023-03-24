const tasksModel = require('../models/tasksModel')

exports.getAll = async (req, res) => {
    const tasks = await tasksModel.getAllTasks()
    return res.status(200).json(tasks)
}

exports.createTask = async (req, res) => {
    const createdTask = await tasksModel.createTasks(req.body)
    if(createdTask) return res.send('Task criada')
    res.send('Titlo não fornecido')
}