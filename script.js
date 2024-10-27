// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filterSelect');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const dueDateInput = document.getElementById('dueDateInput');
const prioritySelect = document.getElementById('prioritySelect');

// Load tasks from local storage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    const filterValue = filterSelect.value;

    tasks.forEach((task, index) => {
        if (filterValue === 'completed' && !task.completed) return;
        if (filterValue === 'pending' && task.completed) return;

        const li = document.createElement('li');
        li.textContent = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})`;
        if (task.completed) li.classList.add('completed');

        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.onclick = () => editTask(index);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => deleteTask(index);

        // Mark task as completed
        li.onclick = () => toggleComplete(index);

        // Append buttons to the list item
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Add new task
addTaskBtn.onclick = () => {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskText) {
        tasks.push({ text: taskText, completed: false, dueDate, priority });
        taskInput.value = '';
        dueDateInput.value = '';
        saveTasks();
        renderTasks();
    }
};

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(index) {
    const newTaskText = prompt("Edit task:", tasks[index].text);
    const newDueDate = prompt("Edit due date:", tasks[index].dueDate);
    const newPriority = prompt("Edit priority (low, medium, high):", tasks[index].priority);

    if (newTaskText !== null && newDueDate !== null && newPriority !== null) {
        tasks[index].text = newTaskText.trim();
        tasks[index].dueDate = newDueDate.trim();
        tasks[index].priority = newPriority.trim();
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Clear completed tasks
clearCompletedBtn.onclick = () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
};

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
filterSelect.onchange = renderTasks;

// Initial render
renderTasks();
