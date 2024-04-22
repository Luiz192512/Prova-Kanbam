// Função para excluir uma tarefa
function excluirTarefa(coluna, index) {
    tarefas[coluna].splice(index, 1); // Remove a tarefa do array
    localStorage.setItem('tarefas-kaban', JSON.stringify(tarefas)); // Atualiza o localStorage
    renderizarTarefas(); // Renderiza novamente as tarefas na interface
}

// Carrega as tarefas do localStorage ou inicializa um objeto vazio se não houver tarefas salvas
let tarefas = JSON.parse(localStorage.getItem('tarefas-kaban')) || { fazer: [], emprogresso: [], concluido: [] };

// Função para permitir que um elemento seja solto em outro elemento
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  // Função para definir o que será arrastado
  function drag(ev) {
    ev.dataTransfer.setData("text/html", ev.target);
  }
  
  // Função para definir onde o elemento será solto
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    // Evita a anexação de texto diretamente; em vez disso, cria um elemento e anexa
    var dataElement = document.createElement("div");
    dataElement.innerHTML = data;
    ev.target.appendChild(dataElement.firstChild); // Adiciona o primeiro filho do elemento criado
}

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
                    tarefaElement.ondragstart = drag;
                    tarefaElement.innerHTML = `<div class="tarefa-titulo">${tarefa.titulo}</div>
                                               <div class="tarefa-descricao">${tarefa.descricao || ''}</div>
                                               <button class="btn-excluir-tarefa" onclick="excluirTarefa('${coluna}', ${index})">Excluir</button>`;
                    colunaElement.appendChild(tarefaElement);
                }
            });
        }
    });
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
// Verifica se o nome da categoria foi inserido na URL como parâmetro
const params = new URLSearchParams(window.location.search);
const nomeCategoria = params.get('categoria');

// Carrega ou cria a categoria com base no nome fornecido na URL
const categoria = carregarCategoria(nomeCategoria);

// Limpar elementos relevantes ao carregar a página kanban.html
