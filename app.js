//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.


var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTaskHolder = document.getElementById("todo__list"); // ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed__list"); // completed-tasks

// New task list item
var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");
    listItem.classList.add("todo__item"); // Initial class for new task

    // input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    // label
    var label = document.createElement("label"); // label
    // input (text)
    var editInput = document.createElement("input"); // text
    // button.edit
    var editButton = document.createElement("button"); // edit button
    // button.delete
    var deleteButton = document.createElement("button"); // delete button
    var deleteButtonImg = document.createElement("img"); // delete button image

    label.innerText = taskString;
    label.className = 'todo__task';

    // Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "todo__input";

    editButton.innerText = "Edit"; // innerText encodes special characters, HTML does not.
    editButton.className = "btn edit-button";

    deleteButton.className = "btn delete-button";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.classList.add('delete-img')
    deleteButton.appendChild(deleteButtonImg);

    // and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

// Add new task
var addTask = function() {
    console.log("Add Task...");
    // Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    // Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

// Edit an existing task.
var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit-button");
    var containsClass = listItem.classList.contains("item--edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("item--edit-mode");
};

// Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function() {
    console.log("Complete Task...");

    var listItem = this.parentNode;

    // Change class from todo__item to completed__item on the <li>
    listItem.classList.remove("todo__item");
    listItem.classList.add("completed__item");

    // Change classes of child elements as well
    var checkBox = listItem.querySelector("input[type=checkbox]");
    var label = listItem.querySelector("label");
    var editButton = listItem.querySelector(".edit-button");
    var deleteButton = listItem.querySelector(".delete-button");

    // Change classes of the child elements
    checkBox.classList.remove("todo__checkbox");
    checkBox.classList.add("completed__checkbox");

    label.classList.remove("todo__task");
    label.classList.add("completed__task");


    // Append the task list item to the #completed-tasks
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark task incomplete
var taskIncomplete = function() {
    console.log("Incomplete Task...");

    var listItem = this.parentNode;

    // Change class from completed__item to todo__item on the <li>
    listItem.classList.remove("completed__item");
    listItem.classList.add("todo__item");

    // Change classes of child elements as well
    var checkBox = listItem.querySelector("input[type=checkbox]");
    var label = listItem.querySelector("label");
    var editButton = listItem.querySelector(".edit-button");
    var deleteButton = listItem.querySelector(".delete-button");

    // Change classes of the child elements
    checkBox.classList.remove("completed__checkbox");
    checkBox.classList.add("todo__checkbox");

    label.classList.remove("completed__task");
    label.classList.add("todo__task");


    // Append the task list item to the #incompleteTasks.
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

// AJAX request (for future functionality)
var ajaxRequest = function() {
    console.log("AJAX Request");
}

// The glue to hold it all together.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// Bind events to task list items
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".edit-button");
    var deleteButton = taskListItem.querySelector(".delete-button");

    // Bind editTask to edit button
    editButton.onclick = editTask;
    // Bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    // Bind taskCompleted to checkBoxEventHandler
    checkBox.onchange = checkBoxEventHandler;
}

// Cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
