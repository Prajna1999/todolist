const todoInput=document.querySelector(".task-input input");
const taskBox=document.querySelector(".task-box");
const filters=document.querySelectorAll(".filters span");
let todos= JSON.parse(localStorage.getItem("todoList")) ;


let editId;
let isTaskEdited=false;

// add event listeners to the filters nodelist.
filters.forEach(btn=>{
    btn.addEventListener("click", (e)=>{
        
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
    })
})
// showTodo function

function showTodo(){
    let li="";
    let isCompleted;
   
    if(todos){
     
        todos.forEach((todo, id)=>{
            if(todo.status==="completed"){
                isCompleted="checked"
            }else{
                isCompleted="";
            }
            // console.log(todo, id)
            li+=`<li class="task">
    
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
    
                <div class="settings">
                    <i onclick="showMenu(this)" class='bx bx-dots-horizontal-rounded'></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id}, '${todo.name}')"><i class='bx bx-edit-alt'></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class='bx bx-trash' ></i>Delete</li>
                    </ul>
                </div>
                
            </li>`
    })
  
        
    }
    taskBox.innerHTML=li;
    
    
}
showTodo();
function showMenu(selectedTask){
    let taskMenu=selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");

    // if click anywhere else the menu will be closed.
    document.addEventListener("click", (e)=>{
        if(e.target.tagName!=="I" || e.target!==selectedTask){
            taskMenu.classList.remove("show");
        }
    })
}

function deleteTask(deleteTaskId){
// remove the task from the local storage array.
    todos.splice(deleteTaskId, 1);
    localStorage.setItem("todoList",JSON.stringify(todos));
    showTodo();
}

function editTask(taskId, taskName){
    editId=taskId;
    isTaskEdited=true;
    todoInput.value=taskName;
}
function updateStatus(selectedTask){
    // grabing the paragraph.
    let taskName=selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status="completed";
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status="pending";
    }
    localStorage.setItem("todoList", JSON.stringify(todos));
}

// add an event listener.

todoInput.addEventListener("keyup", (e)=>{
    let userTask=todoInput.value.trim();
    // save to the localstorage and show the item in the UI
    if(e.key==="Enter" && userTask){
        if(!isTaskEdited){ //if istaskEdited isn't true
            if(!todos){
                todos=[];

            }
            let taskInfo={name: userTask, status:"pending"};
            todos.push(taskInfo);

        }else{
            isTaskEdited=false;
            todos[editId].name=userTask;

        }
        
         
          
            todoInput.value="";
            localStorage.setItem("todoList",JSON.stringify(todos) );
           
            showTodo();
        
    }

})