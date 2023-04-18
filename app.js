let task;
let tasks = [];
let saved_tasks;
let identificator;

function add_task(task, id) {
  if (task == "") {
    document.getElementById("task_name").style.backgroundColor = "#DC3545";
    document.getElementById("task_name").placeholder =
      "Enter a valid task name!";
    document.getElementById("task_name").classList.add("white");

    setTimeout(() => {
      document.getElementById("task_name").style.backgroundColor = "white";
      document.getElementById("task_name").placeholder = "Enter a task";
      document.getElementById("task_name").classList.remove("white");
    }, 1500);
  } else {
    if (id == 0) {
      document.getElementById("task_name").style.backgroundColor = "lightgreen";
      document.getElementById("task_name").classList.add("black");

      setTimeout(() => {
        document.getElementById("task_name").style.backgroundColor = "white";
        document.getElementById("task_name").classList.remove("black");
      }, 1000);
    }

    let task_div = document.createElement("div");
    task_node = document.createTextNode(task);
    task_div.appendChild(task_node);

    let newTask = document.createElement("div");
    newTask.className =
      "d-flex flex-row justify-content-center align-items-center p-2 m-1";
    newTask.appendChild(task_div);

    if (id == "0") {
      identificator = new Date();
      identificator = identificator.getTime();
    } else {
      identificator = id;
    }

    newTask.id = identificator;

    let button_div = document.createElement("div");
    button_div.className = "ms-auto";

    let button = document.createElement("button");
    button.className = "btn btn-danger";
    button.appendChild(document.createTextNode("X"));
    button.className = "btn btn-danger";
    button.value = identificator;
    button.setAttribute("onclick", "del(" + identificator + ")");

    button_div.appendChild(button);
    newTask.appendChild(button_div);

    let taskOutput = document.querySelector(".list");
    taskOutput.appendChild(newTask);

    document.querySelector("#task_name").value = "";
    tasks.push([task.toString(), identificator]);
  }
}

function del(x) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i][1] == x) {
      document.getElementById("" + x).remove();
      tasks.splice(i, 1);
    }
  }
}

window.onload = () => {
  saved_tasks = localStorage.getItem("saved_tasks");
  saved_tasks = JSON.parse(saved_tasks);

  saved_tasks.forEach((element) => {
    add_task(element[0], element[1]);
  });

  localStorage.clear();
};

window.onbeforeunload = () => {
  saved_tasks = JSON.stringify(tasks);
  localStorage.setItem("saved_tasks", saved_tasks);
};
