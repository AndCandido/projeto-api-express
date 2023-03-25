const fetchTasks = async () => {
    const url = 'http://localhost:3003/tasks'

    const response = await fetch(url)
    const tasks = await response.json()
    return tasks
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
    
    return button
}

const createRow = (task) => {
    const tableRow = createElement('tr')

    const tdTitle = createElement('td', task.title)
    const tdCreatedAt = createElement('td', task.created_at)
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
    const tasks = await fetchTasks()
    const tBody = document.querySelector('tbody')

    for (let task of tasks) {
        tBody.appendChild(createRow(task))
    }
}

loadTasks()