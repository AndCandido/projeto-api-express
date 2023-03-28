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
        method: 'put',
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

const createSelect = (status) => {
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

    select.value = status

    return select
}

const createBtnAction = (type) => {
    const button = createElement('button')

    button.classList.add('btn-action')
    button.classList.add(`btn-${type}`)
    button.innerHTML = `<span class="material-symbols-outlined">${type}</span>`

    return button
}

const editTask = () => {

}

const createEditForm = (title) => {
    const form = createElement('form')
    const input = createElement('input')
    input.value = title
    input.classList.add('input-task')
    form.appendChild(input)
    return form
}

const createRow = (task) => {
    const { id, title, created_at, status } = task
    const tableRow = createElement('tr')

    const tdTitle = createElement('td', title)
    const tdCreatedAt = createElement('td', formateDate(created_at))
    const tdStatus = createElement('td')
    const tdBtnAction = createElement('td')

    const select = createSelect(status)
    select.addEventListener('change', 
        ({ target }) => updateTask({ ...task, status: target.value }))

    tdStatus.appendChild(select)

    const editForm = createEditForm(title)

    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const { value } = editForm.querySelector('input')
        updateTask({ ...task, title: value})
    })

    const btnEdit = createBtnAction('edit')
    const btnDelete = createBtnAction('delete')
    btnDelete.addEventListener('click', () => deleteTask(id))
    btnEdit.addEventListener('click', () => {
        tdTitle.innerText = ''
        tdTitle.appendChild(editForm)
    })

    tdBtnAction.appendChild(btnEdit)
    tdBtnAction.appendChild(btnDelete)

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