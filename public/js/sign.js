const form = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Validate form data (e.g., username length, password strength)
    // If validation fails, display error message and return

    // Send signup data to your backend API using fetch
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
    });

    if (response.ok) {
        // Handle successful signup
        // (e.g., redirect to login page)
    } else {
        const error = await response.json();
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('d-none');
    }
});
