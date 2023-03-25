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

    const fetchOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    await fetch(url, fetchOptions)
    loadTasks()
    clearInput()
}

const deleteTask = async (e) => {
    console.log(e)
}

const editTask = (e) => {

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

const createBtnAction = (type) => {
    const button = createElement('button')

    button.classList.add('btn-action')
    button.classList.add(`btn-${type}`)
    button.innerHTML = `<span class="material-symbols-outlined">${type}</span>`

    switch(type) {
        case 'delete':
            button.addEventListener('click', deleteTask)
            break
        case 'edit':
            button.addEventListener('click', editTask)
            break
    }
    return button
}

const createRow = (task) => {
    const tableRow = createElement('tr')

    const tdTitle = createElement('td', task.title)
    const tdCreatedAt = createElement('td', formateDate(task.created_at))
    const tdStatus = createElement('td')
    const tdBtnAction = createElement('td')

    tdStatus.appendChild(createSelect())

    tdBtnAction.appendChild(createBtnAction('edit'))
    tdBtnAction.appendChild(createBtnAction('delete'))

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