let statusOutput = document.getElementById('status');
let addTodoInput = document.getElementById('addTodo-input');
let renameTodoInput = document.getElementById('renameTodo-input');
let todoList = document.getElementById('todo-list');

class Todo {
    name;
    id = new Date().getTime();
    constructor(name) {
        this.name = name;
    }
}

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
    let newTodo = addTodoInput.value;
    let created = false;
    newTodo = newTodo.trim();
    if (newTodo == '') {
        statusMsg('Cannot leave input blank', 'red');
        addTodoInput.value = '';
        return;
    }
    newTodo = newTodo[0].toUpperCase() + newTodo.slice(1);
    todos.forEach(e => {
        if (newTodo == e.name) {
            statusMsg('Todo was already created', 'red');
            created = true;
            return;
        }
    });
    if (created) return;
    addTodoInput.value = '';
    todos.push(new Todo(newTodo));
    updateTodoList();
    localStorage.setItem('todos', JSON.stringify(todos));
    statusMsg('Todo was added to the list', 'green');
}

function renameTodo(id) {
    let pos;
    for (let i = 0; i < todos.length; i++) {
        if (id == todos[i].id) {
            pos = i;
            break;
        }
    }
    let addForm = document.getElementById('addTodo-form');
    let renameForm = document.getElementById('renameTodo-form');
    addForm.style.display = 'none';
    renameForm.style.display = 'flex';
    renameTodoInput.value = todos[pos].name;
    renameTodoInput.focus();
    renameTodoInput.select();

    document.getElementById('renameTodo-button').addEventListener('click', e => {
        removeEventListener('click', document.getElementById('renameTodo-button'));
        let newTodo = renameTodoInput.value;
        let created = false;
        newTodo = newTodo.trim();
        if (newTodo == '') {
            statusMsg('Cannot leave input blank', 'red');
            renameTodoInput.value = '';
            return;
        }
        newTodo = newTodo[0].toUpperCase() + newTodo.slice(1);
        todos.forEach(e => {
            if (newTodo == e.name) {
                statusMsg('Todo was already created', 'red');
                created = true;
                return;
            }
        });
        if (created) return;
        todos[pos].name = newTodo;
        document.getElementById(todos[pos].id + '-title').innerHTML = newTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
        addForm.style.display = 'flex';
        renameForm.style.display = 'none';
        statusMsg('Todo was added to the list', 'green');
    });
}

function deleteTodo(id) {
    let pos;
    for (let i = 0; i < todos.length; i++) {
        if (id == todos[i].id) {
            pos = i;
            break;
        }
    }
    document.getElementById(todos[pos].id).remove();

    todos.splice(pos, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    statusMsg('Removed Todo from the list', 'green');
}

function statusMsg(message, color) {
    statusOutput.innerHTML = `<p class="${color}">${message}</p>`;
    setTimeout(() => statusOutput.innerHTML = '<p>&nbsp;</p>', 2000);
}

function clearTodos() {
    localStorage.clear();
    todos = [];
    statusMsg('All Todos removed from the list', "green");
    todoList.innerHTML = '';
}

function updateTodoList() {
    let temp = '';
    todos.forEach(e => {
        temp += `<li class="todo" id="${e.id}">
                <span id="${e.id}-title">${e.name}</span>
                <span class="todo-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#006400" onclick="renameTodo(${e.id})">
                        <path
                            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000" onclick="deleteTodo(${e.id})">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </span>
            </li>`;
    });
    todoList.innerHTML = temp;
}

updateTodoList();