// Função para excluir uma tarefa
function excluirTarefa(coluna, index) {
    tarefas[coluna].splice(index, 1); // Remove a tarefa do array
    localStorage.setItem('tarefas-kaban', JSON.stringify(tarefas)); // Atualiza o localStorage
    renderizarTarefas(); // Renderiza novamente as tarefas na interface
}

// Carrega as tarefas do localStorage ou inicializa um objeto vazio se não houver tarefas salvas
let tarefas = JSON.parse(localStorage.getItem('tarefas-kaban')) || { fazer: [], emprogresso: [], concluido: [] };

// Seleciona todas as colunas
const columns = document.querySelectorAll(".tarefas");

// Adiciona event listener para iniciar o arrastar
document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

// Adiciona event listener para finalizar o arrastar
document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

// Adiciona event listener para arrastar sobre as colunas
columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault(); // Evita o comportamento padrão de não permitir soltar
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(column, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      column.prepend(dragging);
    }
  });
});

// Função para determinar a nova posição do elemento
function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let card of cards) {
    const box = card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) {
      result = card;
    }
  }

  return result;
}

// Adiciona event listener para soltar o elemento
columns.forEach((column) => {
  column.addEventListener("drop", (e) => {
    e.preventDefault(); // Evita o comportamento padrão de não permitir soltar
    const dragging = document.querySelector(".dragging");
    const columnId = column.id; // Obtém o ID da coluna
    const taskTitle = dragging.querySelector(".task-title").innerText; // Obtém o título da tarefa

    // Salva a tarefa na coluna correta
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.push(taskTitle);
    localStorage.setItem(columnId, JSON.stringify(tasks));

    dragging.remove(); // Remove o elemento arrastado da lista
  });
});


// Função para renderizar as tarefas na interface
// Função para renderizar as tarefas na interface
// Função para renderizar as tarefas na interface
function renderizarTarefas() {
    Object.keys(tarefas).forEach(coluna => {
        const colunaElement = document.getElementById(`${coluna}-tarefas`);
        if (colunaElement) { // Verifica se o elemento da coluna existe
            colunaElement.innerHTML = ''; // Limpa a coluna antes de adicionar tarefas

            // Itera sobre as tarefas da coluna e adiciona na interface
            tarefas[coluna].forEach((tarefa, index) => {
                if (tarefa !== null) {
                    const tarefaElement = document.createElement('div');
                    tarefaElement.classList.add('tarefa');
                    tarefaElement.draggable = true;
                    tarefaElement.innerHTML = `<div class="tarefa-titulo">${tarefa.titulo}</div>
                                               <div class="tarefa-descricao">${tarefa.descricao || ''}</div>
                                               <button class="btn-excluir-tarefa" onclick="excluirTarefa('${coluna}', ${index})"><img src="Img/lixeira.png" class="fa-lixeira"></img>></button>
                                               <button class="btn-editar-tarefa" onclick="editarTarefa('${coluna}', ${index})"><img src="Img/ferramenta-lapis.png" class="fa-pencil-alt"></img></button>`; // Ícone de lápis
                    colunaElement.appendChild(tarefaElement);
                }
            });
        }
    });
}


// Função para editar uma tarefa
function editarTarefa(coluna, index) {
    const novoTitulo = prompt("Digite o novo título da tarefa:");
    const novaDescricao = prompt("Digite a nova descrição da tarefa:");
    
    // Verifica se o usuário não cancelou a edição e atualiza os valores da tarefa
    if (novoTitulo !== null && novaDescricao !== null) {
        tarefas[coluna][index].titulo = novoTitulo;
        tarefas[coluna][index].descricao = novaDescricao;
        localStorage.setItem('tarefas-kaban', JSON.stringify(tarefas));
        renderizarTarefas();
    }
}


// Função para adicionar uma nova tarefa
function adicionarTarefa(coluna) {
    const titulo = document.getElementById('titulo-tarefa').value;
    const descricao = document.getElementById('descricao-tarefa').value;
    const novaTarefa = { titulo, descricao };
    tarefas[coluna].push(novaTarefa);
    localStorage.setItem('tarefas-kaban', JSON.stringify(tarefas));
    document.getElementById('modal-tarefa').style.display = 'none';
    renderizarTarefas();
    
}

// Adiciona event listeners aos botões de adicionar tarefa
document.querySelectorAll('.btn-adicionar-tarefas').forEach(button => {
    button.addEventListener('click', function() {
        const coluna = this.getAttribute('data-column');
        document.getElementById('modal-tarefa').style.display = 'block';
        document.getElementById('btn-salvar-tarefa').onclick = function() {
            adicionarTarefa(coluna);
        };
    });
});

// Renderiza as tarefas ao carregar a página
renderizarTarefas();

// Função para carregar ou criar uma categoria no Local Storage
function carregarCategoria(nomeCategoria) {
    // Verifica se a categoria já existe no Local Storage
    if (localStorage.getItem(nomeCategoria) === null) {
        // Se não existir, cria a categoria com um array vazio
        localStorage.setItem(nomeCategoria, JSON.stringify([]));
        return [];
    } else {
        // Se existir, retorna os elementos salvos na categoria
        return JSON.parse(localStorage.getItem(nomeCategoria));
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Seu código para carregar e exibir tarefas de kanban aqui
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var kanbanName = urlParams.get('categoria');
    
    // Verifica se o parâmetro categoria foi passado
    if (kanbanName) {
      // Carrega e exibe as tarefas deste kanban
      var tarefas = JSON.parse(localStorage.getItem(kanbanName)) || [];
      var kanbanList = document.querySelector('.kanban-list');

      var kanbanCard = document.createElement('div');
      kanbanCard.classList.add('kanban-card');

      var tarefasDiv = document.createElement('div');
      tarefasDiv.classList.add('tarefas');
      tarefas.forEach(function(tarefa) {
        var tarefaElement = document.createElement('div');
        tarefaElement.textContent = tarefa;
        tarefasDiv.appendChild(tarefaElement);
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    const titulo = document.querySelector('.titulo');
    titulo.textContent = nomeCategoria;
  });
// Verifica se o nome da categoria foi inserido na URL como parâmetro
const params = new URLSearchParams(window.location.search);
const nomeCategoria = params.get('categoria');

// Carrega ou cria a categoria com base no nome fornecido na URL
const categoria = carregarCategoria(nomeCategoria);

// Limpar elementos relevantes ao carregar a página kanban.html
