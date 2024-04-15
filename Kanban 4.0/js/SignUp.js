var users = [];

// Function to sign up
function signup() {
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;

  users.push({ email: email, password: password });

  alert("Sign up successful!");
}