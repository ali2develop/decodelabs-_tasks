// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Close mobile menu on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// Interactive Project Task Tracker State & Logic
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

let tasks = [
    { id: 1, text: "Set up HTML5 semantic structure & viewport meta tags", completed: true },
    { id: 2, text: "Configure CSS Flexbox and media query breakpoints", completed: false },
    { id: 3, text: "Implement JavaScript mobile navigation hamburger toggle", completed: false },
    { id: 4, text: "Perform cross-device layout verification and testing", completed: false }
];

function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 1rem;">No tasks added yet. Add one above!</p>';
        updateProgress();
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <label class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                <span>${escapeHtml(task.text)}</span>
            </label>
            <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        taskList.appendChild(li);
    });

    updateProgress();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
});

function updateProgress() {
    if (tasks.length === 0) {
        progressFill.style.width = '0%';
        progressText.textContent = '0% Complete';
        return;
    }

    const completedCount = tasks.filter(task => task.completed).length;
    const percentage = Math.round((completedCount / tasks.length) * 100);
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
}

// XSS Protection Utility
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Initial Render on page load
renderTasks();