// Adiciona um ouvinte de evento ao formulário de inscrição (signupForm)
console.log("Adicionando ouvinte de evento ao formulário de inscrição.");
document.getElementById('signupForm').addEventListener('submit', function(event) {
  console.log("Evento de envio do formulário acionado.");
  // Impede o comportamento padrão de enviar o formulário
  event.preventDefault();
  
  // Obtém o valor do campo de entrada de e-mail (signupEmail)
  console.log("Obtendo valor do campo de e-mail.");
  var email = document.getElementById('signupEmail').value;
  
  // Obtém o valor do campo de entrada de senha (signupPassword)
  console.log("Obtendo valor do campo de senha.");
  var password = document.getElementById('signupPassword').value;
  
  // Armazena o e-mail no armazenamento local do navegador
  console.log("Armazenando e-mail no armazenamento local.");
  localStorage.setItem('email', email);
  
  // Armazena a senha no armazenamento local do navegador
  console.log("Armazenando senha no armazenamento local.");
  localStorage.setItem('password', password);
  
  // Redireciona o usuário para a página de login (Login.html)
  console.log("Redirecionando para a página de login.");
  window.location.href = 'Login.html';
});
