const tasksModel = require('../models/tasksModel')

exports.getAll = async (req, res) => {
    res.send( await tasksModel.getAllTasks() )
}
