document.getElementById('addTaskBtn').addEventListener('click', function() {
    var kanbanBoard = document.getElementById('kanbanBoard');
  
    var newTask = document.createElement('div');
    newTask.className = 'column';
    
    var taskTitle = prompt('Digite o título da tarefa:');
    if (taskTitle) {
      var taskTitleElement = document.createElement('h2');
      taskTitleElement.textContent = taskTitle;
      newTask.appendChild(taskTitleElement);
  
      var taskDescription = prompt('Digite a descrição da tarefa:');
      if (taskDescription) {
        var taskDescriptionElement = document.createElement('p');
        taskDescriptionElement.textContent = taskDescription;
        newTask.appendChild(taskDescriptionElement);
        
        kanbanBoard.appendChild(newTask);
      } else {
        alert('Descrição da tarefa é obrigatória!');
      }
    } else {
      alert('Título da tarefa é obrigatório!');
    }
  });
  