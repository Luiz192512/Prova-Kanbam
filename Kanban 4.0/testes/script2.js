const customizeForm = document.getElementById('customize-form');

customizeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const boardId = new URLSearchParams(window.location.search).get('boardId');
  const boardTitle = document.getElementById('board-title').value;
  const boardBackground = document.getElementById('board-background').value;

  // Use the Trello API to update the board's title and background
  fetch(`https://api.trello.com/1/boards/${boardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 96f24f62e0436e0dceeb17149f0431d6'
    },
    body: JSON.stringify({
      name: boardTitle,
      preferredBackground: boardBackground,
      key: '96f24f62e0436e0dceeb17149f0431d6',
      token: 'ATTAad65ccae671d3f7dbfb75ffa9b141f1c3597df1e5cb0b5eaa8d59fcb1fc9f70cF1169CC0'
    })
  })
  .then(response => response.json())
  .then(board => {
    // Redirect the user to the updated board
    window.location.href = `https://trello.com/b/${board.shortLink}`;
  });
});