// Simulating user role, replace this with actual logic in your application
const userRole = "MEMBER"; // or "MEMBER"

console.log("running from the Server");

// Function to dynamically generate content based on user role
function generateDashboardContent() {
  const dashboardContent = document.getElementById("dashboard-content");

  if (userRole === "LIBRARIAN") {
    dashboardContent.innerHTML = `
            <h3>Welcome, Librarian!</h3>
            <div>
                <h4>Manage Books</h4>
                <button id="add-book-btn" class="btn btn-success">Add Book</button>
                <button id="update-book-btn" class="btn btn-primary">Update Book</button>
                <button id="delete-book-btn" class="btn btn-danger">Delete Book</button>
            </div>
            <div>
                <h4>Manage Members</h4>
                <!-- Add LIBRARIAN-specific content for managing members here -->
            </div>
            <!-- Add additional LIBRARIAN-specific content here -->
        `;
  } else if (userRole === "MEMBER") {
    dashboardContent.innerHTML = `
            <h3>Welcome, Member!</h3>
            <div>
                <h4>Available Books</h4>
                <!-- Display available books and their status (available/borrowed) -->
                <div class="card-div grid-container">
                    <div class="card custom-card  grid-item">
                        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Book Cover Image">
                        <div class="card-body">
                        <h5 class="card-title">Book Title</h5>
                        <p class="card-text">Author: Author Name</p>
                        <p class="card-text">Published Year: 2023</p>
                        <p class="card-text">Available</p>
                        <button class="btn btn-primary" onclick="showDetails()">Show Details</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4>Manage Account</h4>
                <button id="delete-account-btn" class="btn btn-danger">Delete Account</button>
            </div>
            <!-- Add additional MEMBER-specific content here -->
        `;
  }
}

// Function to handle logout
function logout() {
  // Perform logout logic, e.g., invalidate JWT token
  // Redirect to the login page
  window.location.href = "/login";
}

// Event listener for logout button
document.getElementById("logout-btn").addEventListener("click", logout);

// Generate dashboard content on page load
document.addEventListener("DOMContentLoaded", generateDashboardContent);

// Event listeners for LIBRARIAN-specific actions
if (userRole === "LIBRARIAN") {
  document
    .getElementById("add-book-btn")
    .addEventListener("click", handleAddBook);
  document
    .getElementById("update-book-btn")
    .addEventListener("click", handleUpdateBook);
  document
    .getElementById("delete-book-btn")
    .addEventListener("click", handleDeleteBook);
}

// Event listener for MEMBER-specific actions
if (userRole === "MEMBER") {
  document
    .getElementById("delete-account-btn")
    .addEventListener("click", handleDeleteAccount);
}

// Functions to handle actions (replace these with your actual logic)
function handleAddBook() {
  alert("Add Book clicked");
}

function handleUpdateBook() {
  alert("Update Book clicked");
}

function handleDeleteBook() {
  alert("Delete Book clicked");
}

function handleDeleteAccount() {
  alert("Delete Account clicked");
}
