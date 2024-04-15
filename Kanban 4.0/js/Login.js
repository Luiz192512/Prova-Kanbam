
function login() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    // Fetch the users data from another HTML file
    fetch('Sign Up.html')
      .then(response => response.text())
      .then(data => {
        // Parse the HTML string to extract users
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var users = [];

        // Extract users from the parsed HTML
        var rows = doc.querySelectorAll('tr');
        rows.forEach(row => {
          var columns = row.querySelectorAll('td');
          var username = columns[0].innerText;
          var password = columns[1].innerText;
          users.push({ username: username, password: password });
        });

        // Check if the entered credentials match any user
        var user = users.find(function(u) {
          return u.username === username && u.password === password;
        });

        if (user) {
          document.getElementById("user-welcome").innerText = user.username;
          document.getElementById("login-form").style.display = "none";
          document.getElementById("welcome-msg").style.display = "block";
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  // Function to logout
  function logout() {
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("welcome-msg").style.display = "none";
  }