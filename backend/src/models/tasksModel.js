const connection = require('./connection')

exports.getAllTasks = async () => {
    const [ tasks ] = await connection.execute('SELECT * FROM tasks')
    return tasks
}

exports.createTasks = async (task) => {
    const { title } = task
    
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)'
    const dateUTC = new Date(Date.now()).toUTCString()

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC])

    return createdTask
}

exports.deleteTask = async (taskId) => {
    const query = 'DELETE FROM tasks WHERE id = ?'
    const [removedTask] = await connection.execute(query, [taskId])
    return removedTask
}

exports.updateTask = async (taskId, task) => {
    const { title, status } = task 
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?'
    const [updatedTask] = await connection.execute(query, [title, status, taskId])
    return updatedTask
}