// Function to handle the submission of a new project form
const newFormHandler = async (event) => {
    event.preventDefault();
  
    // Get the values from the form inputs
    const name = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
    if (name && description) {
      try {
        // Send a POST request to create a new project
        const response = await fetch(`/api/projects`, {
          method: 'POST',
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // If the response is successful, redirect to the profile page
          document.location.replace('/profile');
        } else {
          // If the response is not successful, display an error message
          alert('Failed to create project. Please try again.');
        }
      } catch (error) {
        // If an error occurs during the request, display an error message
        console.error('Create project error:', error);
        alert('An error occurred while creating the project. Please try again.');
      }
    }
  };
  
  // Function to handle the click event on the delete project button
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      try {
        // Send a DELETE request to delete the specified project
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // If the response is successful, redirect to the profile page
          document.location.replace('/profile');
        } else {
          // If the response is not successful, display an error message
          alert('Failed to delete project. Please try again.');
        }
      } catch (error) {
        // If an error occurs during the request, display an error message
        console.error('Delete project error:', error);
        alert('An error occurred while deleting the project. Please try again.');
      }
    }
  };
  
  // Add event listener to the new project form submission
  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);
  
  // Add event listener to the delete project button click
  document.querySelector('.project-list').addEventListener('click', delButtonHandler);
  