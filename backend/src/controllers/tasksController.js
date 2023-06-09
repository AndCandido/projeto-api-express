const tasksModel = require('../models/tasksModel')

exports.getAll = async (req, res) => {
    const tasks = await tasksModel.getAllTasks()
    return res.status(200).json(tasks)
}

exports.createTask = async (req, res) => {
    const errors = req.flash('errors')
    if(errors.length > 0) 
        return res.status(400).json({ message:  errors})
    const createdTask = await tasksModel.createTasks(req.body)
    return res.status(201).json({ insertId: createdTask.insertId })
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params
    const removedTask = await tasksModel.deleteTask(id)
    return res.status(200).json(removedTask)
}

exports.updateTask = async (req, res) => {
    const errors = req.flash('errors')
    if(errors.length > 0) 
        return res.status(400).json({ message:  errors})
    
    const { id } = req.params

    const updatedTask = await tasksModel.updateTask(id, req.body)
    return res.status(204).json(updatedTask)
}