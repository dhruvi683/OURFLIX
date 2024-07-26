const imageBaseUrl = "https://via.placeholder.com/150"; // Example placeholder URL

/**
 * Function to toggle heart icon and update favorites
 * @param {HTMLElement} button - The button element that was clicked
 */
function toggleHeart(button) {
  const heartIcon = button.querySelector(".heart-icon");
  const movieId = button.dataset.id;
  
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movieIndex = favorites.findIndex((movie) => movie.id === movieId);

  if (movieIndex !== -1) {
    // Remove movie from favorites
    favorites.splice(movieIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Movie removed from favorites");
    heartIcon.classList.add("text-white");
    heartIcon.classList.remove("text-secondary");
  }

  // Refresh the displayed list of favorites
  displayFavorites();
}

/**
 * Function to create movie card HTML
 * @param {Object} movie - The movie object containing movie details
 * @returns {HTMLElement} - The created movie card element
 */
function createMovieCard(movie) {
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
        data-id="${movie.id}"
        data-image="${imageBaseUrl}${movie.poster_path}"
        data-title="${movie.title}">
        <svg class="w-6 h-6 ${movie.isFavorite ? "text-secondary" : "text-white"} heart-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${movie.title}</h5>
      <p class="text-gray-600 dark:text-gray-300">${movie.description || "No description available"}</p>
      <textarea class="note-input flot-bottom mb-2 p-2 w-full text-gray-900 dark:text-white dark:bg-gray-700" placeholder="Add your note here...">${movie.note || ""}</textarea>
      <button class="save-note text-s font-roboto font-bold text-white border-2 border-secondary py-2 px-6 rounded-2xl bg-secondary hover:border hover:bg-black hover:text-secondary hover:underline" data-id="${movie.id}">Save Note</button>
    </div>`;

  return movieCard;
}

/**
 * Function to display favorites in the UI
 */
function displayFavorites() {
  const targetElement = document.getElementById("movies");
  targetElement.innerHTML = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    targetElement.innerHTML = "<p class='text-white'>No movies in favorites</p>";
    return;
  }

  // Create and append movie cards
  favorites.forEach((movie) => {
    movie.isFavorite = true; // Set the movie as favorite for display
    const movieCard = createMovieCard(movie);
    targetElement.appendChild(movieCard);
  });

  // Attach event listeners to the newly added elements
  attachEventListeners();
}

/**
 * Function to save a note for a movie
 */
function saveNote() {
  const movieId = this.dataset.id;
  const noteInput = this.previousElementSibling;
  const note = noteInput.value;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movieIndex = favorites.findIndex((movie) => movie.id === movieId);
  if (movieIndex !== -1) {
    // Update note for the movie
    favorites[movieIndex].note = note;
    localStorage.setItem("favorites", JSON.stringify(favorites));
    noteInput.value = note;
    alert("Note saved successfully");
  }
}

/**
 * Function to attach event listeners to buttons
 */
function attachEventListeners() {
  // Attach event listeners to save note buttons
  document.querySelectorAll(".save-note").forEach((button) => {
    button.addEventListener("click", saveNote);
  });

  // Attach event listeners to heart icon buttons
  document.querySelectorAll(".relative button").forEach((button) => {
    button.addEventListener("click", (event) => {
      toggleHeart(event.currentTarget);
    });
  });
}

/**
 * Function to filter favorites based on search input
 */
function searchMovies() {
  const searchInput = document.getElementById('search-movies').value.toLowerCase();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const filteredFavorites = favorites.filter(movie => movie.title.toLowerCase().includes(searchInput));

  const targetElement = document.getElementById("movies");
  targetElement.innerHTML = "";

  if (filteredFavorites.length === 0) {
    targetElement.innerHTML = "<p class='text-white'>No movies found</p>";
    return;
  }

  // Create and append filtered movie cards
  filteredFavorites.forEach((movie) => {
    movie.isFavorite = true; // Set the movie as favorite for display
    const movieCard = createMovieCard(movie);
    targetElement.appendChild(movieCard);
  });

  // Attach event listeners to the newly added elements
  attachEventListeners();
}

// Event listeners for search button and page load
document.getElementById('searchMovie').addEventListener('click', searchMovies);
document.addEventListener("DOMContentLoaded", displayFavorites);
