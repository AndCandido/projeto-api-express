const tasksModel = require('../models/tasksModel')

exports.getAll = async (req, res) => {
    const tasks = await tasksModel.getAllTasks()
    return res.status(200).json(tasks)
}
 