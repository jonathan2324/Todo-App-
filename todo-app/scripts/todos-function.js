'use strict'

//fetch existing todos from localStorage 
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {

        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {

        return []

    }

}
//Save todos to local storage 
const saveTodos =  (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}
//Render application todos based on filters 
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.complete 

        return searchTextMatch && hideCompletedMatch
    })

    
    const incompletedTodos = filteredTodos.filter( (todo) => !todo.complete)
    
    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompletedTodos))
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
        
        
            todoEl.appendChild(generateTodoDOM(todo))
            
        })

    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add("empty-message")
        messageEl.textContent = "No todos to show"
       todoEl.appendChild(messageEl)
        
    }

}
//Remove todos
const removeTodo = (id) => {
    const todoIndex = todos.findIndex ((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice (todoIndex, 1)
    }
}

const adjustTodos = (id) => {
    const findTodo = todos.filter ((todo) => {
        if (todo.id === id)  {
            todo.complete = !todo.complete
        }
    })
    return findTodo
}

/* Andrews solution to toggle 
const toggleTodo = function (id) {
    const todo = todos.find (function (todo) {
        return todo.id === id 
        
    })

    if (todo !== undefined)  {
        todo.complete = !todo.complete
    }
}


*/

//Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todosEl = document.createElement('label')
    const containerEl = document.createElement("div")
    const checkboxEl = document.createElement('input')
    const todoText = document.createElement('span')
    const button = document.createElement('button')
    
    //setup todo checkbox 
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = todo.complete
    containerEl.appendChild(checkboxEl)
    checkboxEl.addEventListener('change',() => {
        adjustTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    //setup todo text - he used todo.text because he labeled each object with text not title
    todoText.textContent = todo.title
    containerEl.appendChild(todoText)

    //setupcontainer
    todosEl.classList.add('list-item')
    containerEl.classList.add("list-item__container")  
    todosEl.appendChild(containerEl)
    
    button.textContent = 'Remove'
    button.classList.add('button', 'button--text')
    todosEl.appendChild(button)
    button.addEventListener('click', () => {

        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

 

    return todosEl
}
//Get the DOM elements for list Summary 
const generateSummaryDOM = (incompletedTodos) => {
    const summary = document.createElement('h2')
    const plural = incompletedTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompletedTodos.length} todo${plural} left`
    return summary
}