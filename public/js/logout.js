// Function to handle user logout
const logout = async () => {
    try {
      // Send a POST request to the logout API endpoint
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If the response is successful, redirect to the homepage
        document.location.replace('/');
      } else {
        // If the response is not successful, display an error message
        alert('Failed to logout. Please try again.');
      }
    } catch (error) {
      // If an error occurs during the logout process, display an error message
      console.error('Logout error:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };
  
  // Add event listener to the logout button
  document.querySelector('#logout').addEventListener('click', logout);
  