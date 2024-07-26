// API and URL constants
//Defines the API key, base URL, and authorization token.
const apiKey = "3f6b049e861ccde82e9b1542a2e96169";
const baseUrl = "https://api.themoviedb.org/3";
const bearerToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjZiMDQ5ZTg2MWNjZGU4MmU5YjE1NDJhMmU5NjE2OSIsIm5iZiI6MTcyMTIxNjUxNy43MzY3NTUsInN1YiI6IjY2OTdhOWM2ZTdhYWMzZjJiMDdhODRiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fTpKTeLFa8VCzqwHVDieNfZlSlWLIqY9zy6MU5mL1-Y";
const imageBaseUrl = "https://image.tmdb.org/t/p/w200";

// Reusable function to fetch data from the API
// fetchData function handles all the fetching and error handling logic.
const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`An error occurred: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

// Function to fetch popular movies and render them
// fetchPopularMovies function fetches and renders popular movies.
const fetchPopularMovies = async (numMovies, targetElementId) => {
  const url = `${baseUrl}/movie/popular`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: bearerToken,
    },
  };

  const data = await fetchData(url, options);
  if (data) renderMovies(data.results.slice(0, numMovies), targetElementId);
};

// Function to fetch search results and render them
// fetchSearchResults function fetches and renders search results based on the query.
const fetchSearchResults = async (query, targetElementId) => {
  const url = `${baseUrl}/search/movie?query=${encodeURIComponent(query)}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: bearerToken,
    },
  };

  const data = await fetchData(url, options);
  if (data) renderMovies(data.results, targetElementId);
};

// Function to create a movie card element
const createMovieCard = (movie, isFavorite) => {
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
      <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}" class="rounded-t-lg w-full h-full p-2" />
      <button class="absolute top-2 right-2 bg-red-500 rounded-full p-2" 
        onclick="toggleHeart(this)"
        data-id="${movie.id}"
        data-image="${imageBaseUrl}${movie.poster_path}"
        data-title="${movie.title}"
        data-description="${movie.overview}">
        <svg class="w-6 h-6 ${isFavorite ? "text-secondary" : "text-white"} heart-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${movie.title}</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${movie.overview}</p>
    </div>
  `;

  return movieCard;
};

// function handles rendering movies into a specified target element
const renderMovies = (movies, targetElementId) => {
  const targetElement = document.getElementById(targetElementId);
  targetElement.innerHTML = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  movies.forEach(movie => {
    const isFavorite = favorites.some(fav => fav.id == movie.id);
    const movieCard = createMovieCard(movie, isFavorite);
    targetElement.appendChild(movieCard);
  });
};

// Event listener for the search button
// Listens for clicks on the search button and fetches search results
document.getElementById("searchMovie").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  if (query) fetchSearchResults(query, "movies");
});

// Function to toggle the favorite status of a movie
// toggleHeart function manages adding/removing movies from favorites and updates the heart icon
const toggleHeart = (button) => {
  const heartIcon = button.querySelector(".heart-icon");
  const movieId = button.dataset.id;
  const imageUrl = button.dataset.image; 
  const title = button.dataset.title;
  const description = button.dataset.description;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movieIndex = favorites.findIndex(movie => movie.id === movieId);

  if (movieIndex === -1) {
    // movie is not in local storage, add it
    const newMovie = {
      id: movieId,
      imageUrl: imageUrl,
      title: title,
      description: description,
    };
    
    favorites.push({ id: movieId, imageUrl, title, description });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Movie added to favorites");
    heartIcon.classList.add("text-secondary");
    heartIcon.classList.remove("text-white");
  } else {
    favorites.splice(movieIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Movie removed from favorites");
    heartIcon.classList.add("text-white");
    heartIcon.classList.remove("text-secondary");
  }

  displayFavorites();
};

// Function to display favorite movies
// displayFavorites function logs favorite movies to the console
const displayFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log("favorites: ", favorites);
  favorites.forEach(movie => {
    console.log("Image URL:", movie.imageUrl);
    console.log("Title:", movie.title);
    console.log("Description:", movie.description);
  });
};

// Initial display of favorite movies and fetching of popular movies
// Displays favorite movies and fetches popular movies on page load
displayFavorites();
fetchPopularMovies(8, "movies");
