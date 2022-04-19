const todoInput=document.querySelector(".task-input input");
const taskBox=document.querySelector(".task-box");
let todos= JSON.parse( localStorage.getItem("todoList")) ;

// showTodo function

function showTodo(){
    let li="";
    if(todos){
        todos.forEach((todo, id)=>{
            // console.log(todo, id)
            li+=`<li class="task">
    
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                    <p>${todo.name}</p>
                </label>
    
                <div class="settings">
                    <i class='bx bx-dots-horizontal-rounded'></i>
                    <ul class="task-menu">
                        <li><i class='bx bx-edit-alt'></i>Edit</li>
                        <li><i class='bx bx-trash' ></i>Delete</li>
                    </ul>
                </div>
                
            </li>`
    })
  
        
    }
    taskBox.innerHTML=li;
    
}
function updateStatus(selectedTask){
    // grabing the paragraph.
    let taskName=selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
    }else{
        taskName.classList.remove("checked");
    }
}

// add an event listener.

todoInput.addEventListener("keyup", (e)=>{
    let userTask=todoInput.value.trim();
    if(e.key==="Enter" && userTask){
        // save to the localstorage.
        
         
        if(!todos){
            todos=[];
        }   
            let taskInfo={name: userTask, status:"pending"};
            todos.push(taskInfo);
            localStorage.setItem("todoList",JSON.stringify(todos) );
            todoInput.value="";
            showTodo();
        
    }

})