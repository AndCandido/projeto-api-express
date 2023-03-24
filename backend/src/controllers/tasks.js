const tasksModel = require('../models/tasksModel')

exports.index = async (req, res) => {
    res.send( await tasksModel.getAllTasks() )
}
