let tasks=[];
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text ) {
     tasks.push({text:text,completed:false});
     updateTasksList();
     taskInput.value = ""; // Clear the input field after adding the task
    }
};
const toggleTaskComplete=(index)=>{
 tasks[index].completed=!tasks[index].completed;
    updateTasksList();

};
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
}
const updateTask=(index)=>{
const taskInput = document.getElementById("taskInput");
taskInput.value=tasks[index].text;
tasks.splice(index,1);
updateTasksList();
taskInput.focus(); // Optionally, focus on the input field for convenience

}
const updateTasksList = () => {
    const tasksList = document.getElementById("task-list");
    tasksList.innerHTML = "";
    tasks.forEach((task,index) => {
        const listItem=document.createElement("li");
        listItem.innerHTML=
        `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}
                />
                <p> ${task.text} </p>
            </div>
            <div class="icons">
               <img src="./images/update.png" onclick="updateTask(${index})"> 
               <img src="./images/sup.png" onclick="deleteTask(${index})"> 
             
            </div>
        </div>

        `;
        listItem.addEventListener('change',()=>toggleTaskComplete(index));

        
        tasksList.appendChild(listItem);
    });


};
document.getElementById("newTask").addEventListener('click',function(e){
    e.preventDefault();
    addTask();
});
