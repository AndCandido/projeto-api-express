const connection = require('./connection')

exports.getAllTasks = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks')
    return tasks
}