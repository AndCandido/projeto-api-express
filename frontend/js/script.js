const tBody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-task')
const url = 'http://localhost:3003/tasks'


const fetchTasks = async () => {

    const response = await fetch(url)
    const tasks = await response.json()
    return tasks
}

const addTask = async (e) => {
    e.preventDefault()
    const body = { title: inputTask.value }

    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    await fetch(url, options)
    loadTasks()
    clearInput()
}

const deleteTask = async (id) => {
    const urlWithId = url + '/' + id
    const options = { method: 'delete' }
    await fetch(urlWithId, options)
    loadTasks()
}

const updateTask = async ({id, title, status }) => {
    const urlWithId = url + '/' + id
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, status})
    }

    await fetch(urlWithId, options)
    loadTasks()
}


const formateDate = (dateUTC) => {
    const options = {
        dateStyle: 'long',
        timeStyle: 'short'
    }
    const date = new Date(dateUTC)
    return date.toLocaleString('pt-br', options)
}

const clearInput = () => {
    inputTask.value = ''
} 

const createElement = (tag, text = '') => {
    const newEle = document.createElement(tag)
    newEle.innerHTML = text
    return newEle
}

const createSelect = () => {
    const select = createElement('select')

    const options = [
        { value: 'pendente', text: 'Pendente' },
        { value: 'em-andamento', text: 'Em andamento' },
        { value: 'concluida', text: 'Concluída' },
    ]

    for (let option of options) {
        const op = createElement('option', option.text)
        op.value = option.value
        select.appendChild(op)
    }

    return select
}

const createBtnAction = (type, taskId) => {
    const button = createElement('button')

    button.classList.add('btn-action')
    button.classList.add(`btn-${type}`)
    button.innerHTML = `<span class="material-symbols-outlined">${type}</span>`

    switch(type) {
        case 'delete':
            button.addEventListener('click', () => deleteTask(taskId))
            break
        case 'edit':
            button.addEventListener('click', () => updateTask(taskId))
            break
    }
    return button
}

const createRow = (task) => {
    const { id, title, created_at, status } = task
    const tableRow = createElement('tr')

    const tdTitle = createElement('td', title)
    const tdCreatedAt = createElement('td', formateDate(created_at))
    const tdStatus = createElement('td')
    const tdBtnAction = createElement('td')

    const select = createSelect()
    select.addEventListener('change', 
        ({ target }) => updateTask({ ...task, status: target.value }))

    tdStatus.appendChild()

    tdBtnAction.appendChild(createBtnAction('edit', id))
    tdBtnAction.appendChild(createBtnAction('delete', id))

    tableRow.appendChild(tdTitle)
    tableRow.appendChild(tdCreatedAt)
    tableRow.appendChild(tdStatus)
    tableRow.appendChild(tdBtnAction)

    return tableRow
}

const loadTasks = async () => {
    clearTable()
    const tasks = await fetchTasks()

    for (let task of tasks) {
        tBody.appendChild(createRow(task))
    }
}

const clearTable = () => {
    tBody.innerHTML = ''
}

addForm.addEventListener('submit', addTask)

loadTasks()