// VARIABLES
const inputEl = document.getElementById("input-el");
const taskBox = document.getElementById("taskbox");
const form = document.getElementById("form");

let taskData = JSON.parse(localStorage.getItem("task-data")) || [];

// FORM AND FUNCTIONS
const updateStorage = () => {
  localStorage.setItem("task-data", JSON.stringify(taskData));
};

const loadData = (taskData) => {
  let storedData = JSON.parse(localStorage.getItem("task-data"));

  if (storedData) {
    storedData.sort((a, b) => new Date(b.id) - new Date(a.id));

    taskData = storedData;
    storedData.forEach((item) => {
      displayTask(item);
    });
  }
};

const displayTask = (newTask) => {
  let taskEl = document.createElement("div");
  taskEl.setAttribute("class", "task-el");
  taskEl.innerHTML = `
    
    <div class="flexbox">
    <div class="task-text">${newTask.text}</div>
    <i class="bi bi-trash-fill deleteBtn"></i>
    </div>
    <small class="small">${newTask.created}</small>  
    
    `;

  taskBox.appendChild(taskEl);
  console.log(newTask);

  // delete function to remove tasks
  const deleteBtn = taskEl.querySelector(".deleteBtn");

  deleteBtn.addEventListener("click", () => {
    const index = taskData.findIndex((i) => i.id === newTask.id);
    if (index !== -1) {
      taskData.splice(index, 1);
      taskBox.removeChild(taskEl);
      updateStorage(taskData);
    }
  });
};

const createTask = (taskText) => {
  let today = new Date();
  let hour12 = today.toLocaleTimeString("en-Us", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = `${today.getDate()} ${months[today.getMonth()]}`;

  let newTask = {
    id: taskData.length,
    text: taskText,
    created: `${date}   [${hour12}]`,
  };
  taskData.push(newTask);
  displayTask(newTask);
  updateStorage(newTask);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let taskText = inputEl.value.trim();

  if (taskText) {
    createTask(taskText);
    inputEl.value = "";
  } else {
    alert("Please enter a task!");
  }
});

loadData();
