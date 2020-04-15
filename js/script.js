// selectors
const todoList = document.querySelector('.todo-list');
const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoFilter = document.querySelector('.todo-filter');


// add event listners
window.addEventListener('DOMContentLoaded', getFromLocal);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', check);
todoFilter.addEventListener('click', filterTodo);



// functions
function addTodo(event){
    event.preventDefault();
    
    // creating the div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');
    // creating list
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerText = todoInput.value;

    // saveToLocal todo
    saveToLocal(todoInput.value);


    todoInput.value= '';

    // appending the listItem to todoDiv
    todoDiv.appendChild(listItem);

    // creating the add button
    const addButton = document.createElement('button');
    addButton.classList.add('complete-button');
    addButton.innerHTML= '<i class="fas fa-check"></i>';
    // appending the addbutton to todoDiv
    todoDiv.appendChild(addButton);

    // creating the trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    // appending the addbutton to todoDiv
    todoDiv.appendChild(trashButton);


    // appending the whole item to the todo-lis
    todoList.appendChild(todoDiv);
}

// adding the check listner function

function check(e){
    const item = e.target;
    // checking the if click on trash button then remove
    if(item.classList[0] === 'trash-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeFromLocal(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        })
        
    }

    // checkin if clicked on the check button
    if(item.classList[0] === 'complete-button'){
        const todo = item.parentElement;
        todo.classList.toggle('completed'); 
         
    }
}


// filter todo function

function filterTodo(e){

    const todos = todoList.childNodes;
    // select the all
    todos.forEach(function(todo){

        switch(e.target.value){

            case 'all':
                todo.style.display = 'flex'; 
                break;

            case 'uncompleted':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                }else{
                    todo.style.display = 'flex';
                }
                break;

                case 'completed':
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
                    break;
        }
    });
    
}

// function check is the todo already in local storage
function checkLocal(){
    if(localStorage.getItem('todos') === null){
        return todos = [];
    }else{
       return  todos= JSON.parse(localStorage.getItem('todos'));
    }
}

// function save to local storage

function saveToLocal(todo){

    let todos = checkLocal();
    // push to local storage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
       
}



// function get from local todos
function getFromLocal(){
    // check function
    let todos = checkLocal();

    todos.forEach((todo)=>{
        // creating the div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        // creating list
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerText = todo;


        todoInput.value= '';

        // appending the listItem to todoDiv
        todoDiv.appendChild(listItem);

        // creating the add button
        const addButton = document.createElement('button');
        addButton.classList.add('complete-button');
        addButton.innerHTML= '<i class="fas fa-check"></i>';
        // appending the addbutton to todoDiv
        todoDiv.appendChild(addButton);

        // creating the trash button
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
        trashButton.innerHTML= '<i class="fas fa-trash"></i>';
        // appending the addbutton to todoDiv
        todoDiv.appendChild(trashButton);


        // appending the whole item to the todo-lis
        todoList.appendChild(todoDiv);

    });
}

// remove from localStorage
function removeFromLocal(todo){
    let todos = checkLocal();
    const item = todo.children[0].innerText;
    const index = todos.indexOf(item);
    todos.splice(index , 1);
    localStorage.setItem('todos' , JSON.stringify(todos));
}