function addTask() {
    var input = document.getElementById("taskInput").value;
    if (input === "") {
        alert("Please enter a task!");
        return;
    }

    var li = createListItem(input);

    document.getElementById("taskList").appendChild(li);

    document.getElementById("taskInput").value = "";

    saveToLocalStorage();
}

function createListItem(text) {
    var li = document.createElement("li");

    var taskText = document.createElement("span");
    taskText.textContent = text;
    li.appendChild(taskText);

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function() {
        li.parentNode.removeChild(li);
        saveToLocalStorage();
    };

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.onclick = function() {
        var newText = prompt("Edit task:", taskText.textContent);
        if (newText !== null && newText !== "") {
            taskText.textContent = newText;
            saveToLocalStorage();
        }
    };

    li.appendChild(deleteButton);
    li.appendChild(editButton);

    return li;
}

function saveToLocalStorage() {
    var tasks = [];
    var taskList = document.getElementById("taskList").getElementsByTagName("li");
    for (var i = 0; i < taskList.length; i++) {
        tasks.push(taskList[i].querySelector("span").textContent);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function() {
    loadFromLocalStorage();
};

function loadFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        var taskList = document.getElementById("taskList");
        for (var i = 0; i < tasks.length; i++) {
            var li = createListItem(tasks[i]);
            taskList.appendChild(li);
        }
    }
}
