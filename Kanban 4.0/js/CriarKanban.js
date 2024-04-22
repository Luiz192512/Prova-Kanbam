// Função para criar o arquivo kanban HTML e redirecionar para kanban.html
function createKanbanFile(kanbanName) {
  console.log("Criando arquivo kanban:", kanbanName);
  // Salvar o nome do kanban no localStorage
  localStorage.setItem('currentKanban', kanbanName);
    // Criar a lista correspondente à categoria no HTML
    var kanbanCard = document.createElement('div');
    kanbanCard.classList.add('card');
  
    var titleElement = document.createElement('p');
    titleElement.classList.add('title');
    titleElement.textContent = kanbanName;
  
    kanbanCard.appendChild(titleElement);

    // Adicionar evento de clique para redirecionar para o kanban correspondente
    kanbanCard.addEventListener('click', function() {
        window.location.href = 'kanban.html?categoria=' + kanbanName;
    });
  
    var kanbanList = document.querySelector('.kanban-list');
    kanbanList.appendChild(kanbanCard);

    // Armazenar os cards em um array
    var kanbanCards = JSON.parse(localStorage.getItem('kanbanCards')) || [];
    kanbanCards.push(kanbanName);

    // Salvar o array de cards no local storage
    localStorage.setItem('kanbanCards', JSON.stringify(kanbanCards));
}


// Evento de clique para redirecionar para o kanban correspondente
function redirectToKanban(kanbanName) {
  window.location.href = 'kanban.html?categoria=' + kanbanName;
}
 // Função para carregar os cards de kanban do localStorage e exibi-los na página
 function carregarCardsKanban() {
  var currentKanban = localStorage.getItem('currentKanban');
  // Se currentKanban não for null ou undefined, significa que uma categoria foi selecionada anteriormente
  if (currentKanban) {
      // Aqui você pode adicionar lógica para carregar e exibir tarefas da categoria atual, se necessário
      console.log("Categoria atual selecionada:", currentKanban);
  } else {
      console.log("Nenhuma categoria selecionada anteriormente.");
  }
}

// Verificar se há cards de kanban ao carregar a página
window.onload = function() {
  carregarCardsKanban();
  iniciarSortable();
};

// Evento de clique para mudar de categoria
document.querySelectorAll('.kanban-card').forEach(function(card) {
  card.addEventListener('click', function() {
      var kanbanName = this.querySelector('.title').textContent;
      createKanbanFile(kanbanName);
      redirectToKanban(kanbanName);
  });
});

    var kanbanCards = JSON.parse(localStorage.getItem('kanbanCards')) || [];
    var kanbanList = document.querySelector('.kanban-list');

    // Limpar a lista de kanban antes de adicionar os cards
    kanbanList.innerHTML = '';

    kanbanCards.forEach(function(kanbanName) {
        var kanbanCard = document.createElement('div');
        kanbanCard.classList.add('card');
  
        var titleElement = document.createElement('p');
        titleElement.classList.add('title');
        titleElement.textContent = kanbanName;
  
        kanbanCard.appendChild(titleElement);

        // Adicionar evento de clique para redirecionar para o kanban correspondente
        kanbanCard.addEventListener('click', function() {
            window.location.href = 'kanban.html?categoria=' + kanbanName;
        });

        kanbanList.appendChild(kanbanCard);
    });
  

// Verificar se há cards de kanban ao carregar a página
window.onload = function() {
    carregarCardsKanban();
};
// Seleciona o elemento de fechamento do modal
const closeBtn = document.querySelector('.close');

// Adiciona um evento de clique ao elemento
closeBtn.addEventListener('click', () => {
  // Seleciona o modal
  const modal = document.getElementById('myModal');

  // Esconde o modal
  modal.style.display = 'none';
});
// Função para exibir o modal e criar o kanban
document.getElementById('createKanbanBtn').addEventListener('click', function() {
    console.log("Exibindo modal...");
    document.getElementById('myModal').style.display = 'block';
});

// Função para criar o kanban ao clicar no botão do modal
document.getElementById('createKanbanModalBtn').addEventListener('click', function() {
    var kanbanName = document.getElementById('kanbanNameInput').value;
    if (kanbanName.trim() !== '') {
        console.log("Criando kanban com o nome:", kanbanName);
        createKanbanFile(kanbanName);
        // Fechar o modal após criar o kanban
        document.getElementById('myModal').style.display = 'none';
    } else {
        alert("Por favor, insira um nome para o kanban.");
    }
});
