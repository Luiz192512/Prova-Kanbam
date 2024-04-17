const board = document.getElementById('board');
const newKanbanButton = document.getElementById('new-kanban-button');
const filterInput = document.getElementById('filter-input');

// Create a new Kanban column
function createKanban() {
  const column = document.createElement('div');
  column.className = 'column';
  column.innerHTML = `
    <h3 contenteditable></h3>
    <div class="tasks" data-name="new"></div>
  `;
  board.appendChild(column);
  saveColumns();
  initSortable(column.querySelector('.tasks'));
}

// Initialize SortableJS for a given tasks container
function initSortable(tasksContainer) {
  Sortable.create(tasksContainer, {
    group: 'tasks',
    animation: 150,
    onEnd: saveTasks
  });
}

// Save the current state of the columns to local storage
function saveColumns() {
  const columnsData = Array.from(board.children).map(column => {
    return {
      name: column.querySelector('h3').innerText,
      tasks: Array.from(column.querySelector('.tasks').children).map(task => task.id)
    };
  });
  localStorage.setItem('columns', JSON.stringify(columnsData));
}

// Save the current state of the tasks to local storage
function saveTasks() {
  const tasksData = Array.from(document.querySelectorAll('.tasks [draggable]')).map(task => {
    return {
      column: task.closest('.tasks').dataset.name,
      id: task.id,
      content: task.innerText.trim()
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasksData));
}

// Load the state of the columns from local storage
function loadColumns() {
  const columnsData = JSON.parse(localStorage.getItem('columns'));
  if (columnsData) {
    columnsData.forEach(columnData => {
      const column = createKanban();
      column.querySelector('h3').innerText = columnData.name;
      columnData.tasks.forEach(taskId => {
        const task = document.getElementById(taskId);
        if (task) {
          column.querySelector('.tasks').appendChild(task);
        }
      });
      initSortable(column.querySelector('.tasks'));
    });
  }
}

// Load the state of the tasks from local storage
function loadTasks() {
  const tasksData = JSON.parse(localStorage.getItem('tasks'));
  if (tasksData) {
    tasksData.forEach(taskData => {
      const task = document.createElement('div');
      task.id = taskData.id;
      task.className = 'task';
      task.innerText = taskData.content;
      task.draggable = true;
      task.addEventListener('dragstart', () => {
        task.style.opacity = '0.5';
      });
      task.addEventListener('dragend', () => {
        task.style.opacity = '1';
      });
      document.querySelector(`[data-name="${taskData.column}"] .tasks`).appendChild(task);
    });
  }
}

// Initialize SortableJS for all tasks containers
document.querySelectorAll('.tasks').forEach(tasksContainer => {
  initSortable(tasksContainer);
});

// Load the state of the columns and tasks from local storage
loadColumns();
loadTasks();

// Create a new Kanban column when the user clicks the "New Kanban" button
newKanbanButton.addEventListener('click', createKanban);

// Filter the Kanban columns by name
filterInput.addEventListener('input', () => {
  const filter = filterInput.value.toLowerCase();
  Array.from(board.children).forEach(column => {
    if (column.querySelector('h3').innerText.toLowerCase().includes(filter)) {
      column.style.display = '';
    } else {
      column.style.display = 'none';
    }
  });
});