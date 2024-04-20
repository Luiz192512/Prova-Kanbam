document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = localStorage.getItem('email');
  var password = localStorage.getItem('password');
  var loginEmail = document.getElementById('loginEmail').value;
  var loginPassword = document.getElementById('loginPassword').value;
  if (email === loginEmail && password === loginPassword) {
    // Authentication successful
    window.location.href = 'MeusKanban.html';
  } else {
    // Authentication failed
    alert('Invalid email or password');
  }
});