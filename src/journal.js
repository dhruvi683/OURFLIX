// Function to toggle heart icon
function toggleHeart(button) {
  const heartIcon = button.querySelector(".heart-icon");

  // retrieve movie data from button's attributes
  const movieId = button.dataset.id;

  // get current favorites from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // check if movie is already in favorites
  const movieIndex = favorites.findIndex((movie) => movie.id === movieId);
  if (movieIndex !== -1) {
    // movie is already in favorites, remove it
    favorites.splice(movieIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Movie removed from favorites");
    heartIcon.classList.add("text-white");
    heartIcon.classList.remove("text-secondary");
  }

  // Call displayFavorites to see the stored favorites
  displayFavorites();
}

const imageBaseUrl = "https://via.placeholder.com/150"; // Example placeholder URL

// function to retrieve and display favorites
function displayFavorites() {
  // Select the target element by ID
  const targetElement = document.getElementById("movies");

  // Clear existing content
  targetElement.innerHTML = "";

  // Get current favorites from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    targetElement.innerHTML = "<p class='text-white'>No movies in favorites</p>";
    return;
  }

  // Iterate over the movies and create movie cards based on numMovies parameter
  favorites.forEach((movie) => {
    console.log("movie data: ", movie); // debugging line

    const isFavorite = true;
    const movieCard = document.createElement("div");

    movieCard.classList.add(
      "max-w-sm",
      "bg-gray-300",
      "border",
      "border-gray-200",
      "rounded-lg",
      "shadow",
      "dark:bg-gray-800",
      "dark:border-gray-700"
    );

    movieCard.innerHTML = `
      <div class="relative">
        <img src="${movie.imageUrl || imageBaseUrl}" alt="${movie.title || "No Title"}" class="rounded-t-lg w-full h-full p-2" />
        <button class="absolute top-2 right-2 bg-red-500 rounded-full p-2" 
          onclick="toggleHeart(this)"
          data-id="${movie.id}"
          data-image="${imageBaseUrl}${movie.poster_path}"
          data-title="${movie.title}">
          <svg class="w-6 h-6 ${isFavorite ? "text-secondary" : "text-white"} heart-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${movie.title}</h5>
        <textarea class="note-input flot-bottom mb-2 p-2 w-full text-gray-900 dark:text-white dark:bg-gray-700" placeholder="Add your note here...">${movie.note || ""}</textarea>
        <button class="save-note text-s font-roboto font-bold text-white border-2 border-secondary py-2 px-6 rounded-2xl bg-secondary hover:border hover:bg-black hover:text-secondary hover:underline" data-id="${movie.id}">Save Note</button>
      </div>
    `;

    // Append the movie card to the target element
    targetElement.appendChild(movieCard);
  });

  // Add event listeners to save note buttons
  const saveNoteButtons = document.querySelectorAll(".save-note");
  saveNoteButtons.forEach((button) => {
    button.addEventListener("click", saveNote);
  });
}

// Function to save note
function saveNote() {
  const movieId = this.dataset.id;
  const noteInput = this.previousElementSibling;
  const note = noteInput.value;

  // Get current favorites from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Find the movie and add the note
  const movieIndex = favorites.findIndex((movie) => movie.id === movieId);
  if (movieIndex !== -1) {
    favorites[movieIndex].note = note;
    // Save the updated favorites back to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Update the displayed note
    noteInput.value = note;
    // Clear the textarea after saving the note
    noteInput.value = "";
    // Display a success message
    alert("Note saved successfully");
  }
}

// Call displayFavorites to display the stored favorites when the page loads
document.addEventListener("DOMContentLoaded", displayFavorites);
