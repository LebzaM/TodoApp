const inputBox = document.getElementById("input-container")
const button = document.querySelector("button")
const list = document.getElementById("list-container")
const alertBox = document.getElementById("alert");

function addTask(){
    if(inputBox.value ===''){
        alert("Add a Task")
    }else{
        let li = document.createElement("li");
        let currentDate = new Date(); 
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
       
        li.innerHTML = `${inputBox.value} - ${month}/${year}`;
        let span = deleteButton(li);
        li.appendChild(span);
        list.appendChild(li);
        inputBox.value = '';
        saveData();
        showAlert();
 
    }
    
}

list.addEventListener("click", (e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        saveData();
    }else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
});

function deleteButton(li){
    let span = document.createElement("span");
    span.innerHTML = "x";
    span.style.marginLeft = "8px";
    span.onclick = function (){
        li.remove();
        saveData();
    }
    return span
}



function saveData() {
    let tasks = [];
    const liElements = document.querySelectorAll("#list-container li");

    liElements.forEach((li) => {
        let taskText = li.textContent.replace(/\s*x$/, ''); 
        tasks.push(taskText.trim()); 
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function searchTask() {
    const query = searchInput.value.toLowerCase().trim();
    const liElements = document.querySelectorAll("#list-container li");
    
    

    liElements.forEach((li) => {
        const taskText = li.textContent.toLowerCase();
        if (taskText.includes(query)) {
            li.style.display = "block"; 
        } else {
            li.style.display = "none"; 
            
        }
    });
}
function loadSavedTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        let li = document.createElement("li");
        li.innerText = task;
        let span = deleteButton(li);
        li.appendChild(span);
        list.appendChild(li);
    });

   
}

function showAlert() {
    alertBox.classList.add("show");
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 2000);
}

function openInstructionsModal() {
    const modal = document.getElementById("instructionsModal");
    modal.style.display = "block";
}

function closeInstructionsModal() {
    const modal = document.getElementById("instructionsModal");
    modal.style.display = "none";
}
//remove innerHTMl
loadSavedTasks();

let darkMode = false;

function changeMode() {
    const body = document.body;
    const sunIcon = document.querySelector('.sun');
    const moonIcon = document.querySelector('.moon');

    darkMode = !darkMode;

    if (darkMode) {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        body.classList.remove('dark-mode');
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
}

 
