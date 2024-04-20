const formTask = document.getElementById('addTask');
const task = document.getElementById('task');

// Função para carregar as cartas salvas do localStorage quando a página for carregada
window.addEventListener('load', () => {
  const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
  savedCards.forEach(card => addCard(card.content, card.status));
});

formTask.addEventListener('submit', (event) => {
  if (task.value != '') {
    addCard(task.value, 'todo'); // Adiciona a carta com o status 'todo'
    task.value = '';
    saveCards(); // Salva as cartas após adicionar uma nova
  }
  event.preventDefault();
});

function addCard(value, status) {
  const todo = document.querySelector('#todo');
  const newCard = document.createElement("div");
  newCard.classList.add('card');
  newCard.draggable = true;
  newCard.innerHTML = `
    <div class="status ${status}"></div> 
    <div class="content"><p>` + value + `</p></div>
  `;
  newCard.addEventListener('dragstart', dragStart);
  newCard.addEventListener('drag', drag);
  newCard.addEventListener('dragend', dragEnd);
  todo.appendChild(newCard);
}

// Função para salvar as cartas no localStorage
function saveCards() {
  const cards = document.querySelectorAll('.card');
  const cardsArray = [];
  cards.forEach(card => {
    const content = card.querySelector('.content p').innerText;
    const status = card.querySelector('.status').classList[1]; // Pega a classe de status da carta
    cardsArray.push({ content, status });
  });
  localStorage.setItem('cards', JSON.stringify(cardsArray));
}


const cards = document.querySelectorAll('.card');
const dropZones = document.querySelectorAll('.dropZone');

cards.forEach( (card) => {
  card.addEventListener( 'dragstart', dragStart );
  card.addEventListener( 'drag', drag );
  card.addEventListener( 'dragend', dragEnd );
})

function dragStart() {
  dropZones.forEach( dropZone => dropZone.classList.add('highlight'));
  this.classList.add('dragging');

  switch(this.parentElement.id) {
    case 'todo':
      this.firstElementChild.classList.remove('todo');
      break;
    case 'doing':
      this.firstElementChild.classList.remove('doing');
      break;
    case 'done':
      this.firstElementChild.classList.remove('done');
      break;
    case 'garbage':
      this.firstElementChild.classList.remove('todo');
      break;
    default:
      break;
  }
}

function drag() {
  
}

function dragEnd() {
  dropZones.forEach( dropZone => dropZone.classList.remove('highlight'));
  this.classList.remove('dragging');
  
  switch(this.parentElement.id) {
    case 'todo':
      this.firstElementChild.classList.add('todo');
      break;
    case 'doing':
      this.firstElementChild.classList.add('doing');
      break;
    case 'done':
      this.firstElementChild.classList.add('done');
      break;
    case 'garbage':
      this.parentElement.removeChild(this);
      break;
    default:
      break;
  }
}

dropZones.forEach( dropZone => {
  dropZone.addEventListener( 'dragenter', dragEnter );
  dropZone.addEventListener( 'dragover', dragOver );
  dropZone.addEventListener( 'dragleave', dragLeave );
  dropZone.addEventListener( 'drop', drop);
})

function dragEnter() {

}

function dragOver() {
  this.classList.add('over');

  const cardBeingDragged = document.querySelector('.dragging');
 
  this.appendChild(cardBeingDragged);
  
}

function dragLeave() {
  this.classList.remove('over');
}

function drop() {
  this.classList.remove('over');
}