// selectors
const todoList = document.querySelector('.todo-list');
const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');

// add event listners
todoButton.addEventListener('click', addTodo);
// add check listner
todoList.addEventListener('click', check);



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
   console.log(e);
    const item = e.target;
    // checking the if click on trash button then remove
    if(item.classList[0] === 'trash-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
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

