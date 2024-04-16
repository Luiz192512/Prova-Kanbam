  // Função para lidar com o cadastro
  function signUp() {
    var username = document.getElementById('signupUsername').value;
    var password = document.getElementById('signupPassword').value;
    localStorage.setItem(username, password);
    alert('Cadastro realizado com sucesso!');
    document.getElementById('signupForm').reset();
  }

  // Adiciona o event listener para o formulário de sign up
  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    signUp();
  });