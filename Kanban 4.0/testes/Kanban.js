const tasks = [
    { id: 1, name: 'Task 1', column: 'todo' },
    { id: 2, name: 'Task 2', column: 'todo' },
    { id: 3, name: 'Task 3', column: 'in-progress' },
    { id: 4, name: 'Task 4', column: 'done' },
];

const columnMap = {
    todo: { id: 'todo', name: 'To Do' },
    inProgress: { id: 'in-progress', name: 'In Progress' },
    done: { id: 'done', name: 'Done' },
};

const container = document.querySelector('.kanban');
const tasksByColumn = {};

const createTaskElement = (task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.textContent = task.name;
    taskElement.dataset.id = task.id;
    taskElement.draggable = true;
    return taskElement;
};

const createColumnElement = (column) => {
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.dataset.id = column.id;
    const columnHeader = document.createElement('h2');
    columnHeader.textContent = column.name;
    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasks');
    columnElement.appendChild(columnHeader);
    columnElement.appendChild(tasksContainer);
    return { columnElement, tasksContainer };
};

const renderTasks = (tasks, tasksContainer) => {
    tasksContainer.innerHTML = '';
    tasks.forEach((task) => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });
};

const renderColumns = () => {
    Object.values(columnMap).forEach((column) => {
        const { columnElement, tasksContainer } = createColumnElement(column);
        container.appendChild(columnElement);
        tasksByColumn[column.id] = [];
        tasksByColumn[column.id].push(tasks.find((task) => task.column === column.id));
        renderTasks(tasksByColumn[column.id], tasksContainer);
    });
};

const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
};

const onDragOver = (event) => {
    event.preventDefault();
};

const onDrop = (event) => {
    const taskId = event.dataTransfer.getData('text/plain');
    const task = tasks.find((task) => task.id === parseInt(taskId));
    const targetColumnId = event.target.closest('.column').dataset.id;
    task.column = targetColumnId;
    tasksByColumn[targetColumnId].push(task);
    tasksByColumn[task.column].splice(tasksByColumn[task.column].indexOf(task), 1);
    renderTasks(tasksByColumn[targetColumnId], event.target.closest('.column').querySelector('.tasks'));
    saveTasks();
};

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks.splice(0, tasks.length, ...savedTasks);
        renderColumns();
    }
};

const initDragAndDrop = () => {
    document.querySelectorAll('.task').forEach((task) => {
        task.addEventListener('dragstart', onDragStart);
    });
    document.querySelectorAll('.column').forEach((column) => {
        column.addEventListener('dragover', onDragOver);
        column.addEventListener('drop', onDrop);
    });
};

renderColumns();
initDragAndDrop();
loadTasks();