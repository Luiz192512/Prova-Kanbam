 // Função para lidar com o login
 function login() {
  var username = document.getElementById('loginUsername').value;
  var password = document.getElementById('loginPassword').value;
  var storedPassword = localStorage.getItem(username);
  if (password === storedPassword) {
    alert('Login bem-sucedido!');
    // Aqui você pode redirecionar o usuário para outra página ou executar outra ação
  } else {
    alert('Credenciais inválidas. Tente novamente.');
  }
  document.getElementById('loginForm').reset();
}

// Adiciona o event listener para o formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário
  login();
});