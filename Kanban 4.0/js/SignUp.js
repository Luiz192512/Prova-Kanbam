document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPassword', password);

  alert('Account created successfully!');
});