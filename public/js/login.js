// Handle login form submission
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

  //login form values being used
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send  POST request tologin API
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // redirect to profile page if successful, if not, display an error message
        document.location.replace('/profile');
      } else {
        alert('Failed to login. Please check your credentials.');
      }
    }
  };
  
  // Handle signup form submission
  const signupFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Collect values from the signup form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      // Send a POST request to the signup API endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If the response is successful, redirect to the profile page
        document.location.replace('/profile');
      } else {
        // If the response is not successful, display an error message
        alert('Failed to sign up. Please try again.');
      }
    }
  };
  
  // Add event listeners to the login and signup forms
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  