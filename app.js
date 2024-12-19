document.addEventListener("DOMContentLoaded", () => {
 const  storedTasks = JSON.parse(localStorage.getItem("tasks"));
 if (storedTasks) {
     saveTasks.forEach(task => {
            tasks.push(task);
            updateTasksList();
            updateStatus();

     }); // Add each task to the tasks array

 }
});
let tasks=[];
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

};
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text ) {
     tasks.push({text:text,completed:false});
     updateTasksList();
     updateStatus();
        saveTasks();
     taskInput.value = ""; // Clear the input field after adding the task
    }
};
const toggleTaskComplete=(index)=>{
 tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    updateStatus();
    saveTasks();

};
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateStatus();
    saveTasks();
}
const updateTask=(index)=>{
const taskInput = document.getElementById("taskInput");
taskInput.value=tasks[index].text;
tasks.splice(index,1);
updateTasksList();
updateStatus();
saveTasks();
taskInput.focus(); // Optionally, focus on the input field for convenience

}
const updateStatus = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    // Prevent division by zero
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Update the progress bar width
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    // Update the stats numbers
    const statsNumbers = document.getElementById("numbers");
    statsNumbers.textContent = `${completedTasks} / ${totalTasks}`;
    if(tasks.length && completedTasks === totalTasks){
        Confetti();
    }
};

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
const Confetti=()=>{
    const end = Date.now() + 15 * 1000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
}
