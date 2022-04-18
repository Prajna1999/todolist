const todoInput=document.querySelector(".task-input input");

// add an event listener.

todoInput.addEventListener("keyup", (e)=>{
    let userTask=todoInput.value.trim();
    if(e.key==="Enter" && userTask){
        // save to the localstorage.
        let todos=localStorage.getItem("todoList");
         
        if(!todos){
            todos=[];
        }
            let taskInfo={name: userTask, status:"pending"};
            todos.push(taskInfo);
            localStorage.setItem("todoList",JSON.stringify(todos) );
        
        
    }

})