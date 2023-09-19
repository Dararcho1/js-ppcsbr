// Import stylesheets
import './style.css';
function Prevent(e){
    e.preventDefault()
}
// Write Javascript code!
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get user input
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Create user object
      const user = {
          username: username,
          password: password,
      };

      // Check if the JSON file exists
      fetch('users.json')
          .then((response) => response.json())
          .then((data) => {
              // Check if user exists
              const existingUser = data.find((u) => u.username === user.username && u.password === user.password);
              if (existingUser) {
                  alert('Login successful');
              } else {
                  alert('Invalid credentials');
              }
          })
          .catch(() => {
              // If the file doesn't exist or there's an error reading it, assume no users yet
              const users = [];
              users.push(user);

              // Save the user to the JSON file
              const jsonData = JSON.stringify(users);

              fetch('users.json', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: jsonData,
              })
                  .then(() => alert('Registration successful'))
                  .catch(() => alert('Error saving data'));
          });
  });
});
