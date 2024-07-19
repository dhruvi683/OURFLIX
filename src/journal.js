// Function to toggle heart icon
function toggleHeart(button) {
  const heartIcon = button.querySelector(".heart-icon");

  // retrieve movie data from button's attributes
  const movieId = button.dataset.id;
  /*const imagUrl = button.dataset.image;
  const title = button.dataset.title;
  const description = button.dataset.description; */

  // get current favorites from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // check if movie is already in favorites
  const movieIndex = favorites.findIndex((movie) => movie.id === movieId);

  if (movieIndex === -1) {
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

// function to retrive and display favorites
function displayFavorites() {
  // Select the target element by ID
  const targetElement = document.getElementById("movies");

  // Clear existing content
  targetElement.innerHTML = "";

  // Get current favorites from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    targetElement.innerHTML =
      "<p class = 'text-whit'>No movies in favorites</p>";
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
                <img src="${movie.imagUrl || imageBaseUrl}" alt="${
      movie.title || "No Title"
    }" class="rounded-t-lg w-full h-full p-2" />
                <button class="absolute top-2 right-2 bg-red-500 rounded-full p-2" 
                  onclick="toggleHeart(this)"
                data-id="${movie.id}"
                data-image="${imageBaseUrl}${movie.poster_path}"
                        data-title="${movie.title}"
                        data-description="${movie.description}">
                  <svg class="w-6 h-6 ${
                    isFavorite ? "text-secondary" : "text-white"
                  } heart-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
                  movie.title
                }</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${
                  movie.description || "No Description"
                }</p>
              </div>
  
              `;

    // Append the movie card to the target element
    targetElement.appendChild(movieCard);
  });
}

// Call displayFavorites to display the stored favorites when the page loads
document.addEventListener("DOMContentLoaded", displayFavorites);

//displayFavorites();

/*
  for (let i = 0; i < Math.min(data.results.length, numMovies); i++) {
    const movie = data.results[i];
    const movieCard = document.createElement("div"); 

 

    console.log("favorites: ", favorites);

    const favoritesDiv = document.getElementById("movies");
    favoritesDiv.innerHTML = "";

    favorites.forEach((movie) => {
      console.log("Image URL:", movie.imageUrl);
      console.log("Title:", movie.title);
      console.log("Description:", movie.description);
      /*
    // Create HTML content for each movie
    const movieDiv = document.createElement("div");
    movieDiv.className =
      "movie max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

    const movieContent = `
      <div class="relative">
        <img src="${movie.imagUrl}" alt="${movie.title}" class="rounded-t-lg w-full h-full p-2" />
      </div>
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${movie.title}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${movie.description}</p>
      </div>
    `;

    movieDiv.innerHTML = movieContent;
    favoritesDiv.appendChild(movieDiv);

    */
