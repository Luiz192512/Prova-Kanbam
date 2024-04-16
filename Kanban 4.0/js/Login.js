document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');

  if (email === storedEmail && password === storedPassword) {
      alert('Login successful!');
      // Redirect to the dashboard or any other page after successful login
      window.location.href = 'dashboard.html';
  } else {
      alert('Invalid email or password');
  }
});