const todoInput=document.querySelector(".task-input input");

let todos= JSON.parse( localStorage.getItem("todoList")) ;

// showTodo function

function showTodo(){
    todos.forEach((todo, id)=>{
        console.log(todo, id)
    })
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