const tasksModel = require('../models/tasksModel')

exports.getAll = async (req, res) => {
    const tasks = await tasksModel.getAllTasks()
    return res.status(200).json(tasks)
}

exports.createTask = async (req, res) => {
    const createdTask = await tasksModel.createTasks(req.body)
    return res.status(201).json({ insertId: createdTask.insertId })
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params
    const removedTask = await tasksModel.deleteTask(id)
    return res.status(200).json(removedTask)
}