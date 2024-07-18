const apiKey = "3f6b049e861ccde82e9b1542a2e96169";
const baseUrl = "https://api.themoviedb.org/3";
const bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjZiMDQ5ZTg2MWNjZGU4MmU5YjE1NDJhMmU5NjE2OSIsIm5iZiI6MTcyMTIxNjUxNy43MzY3NTUsInN1YiI6IjY2OTdhOWM2ZTdhYWMzZjJiMDdhODRiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fTpKTeLFa8VCzqwHVDieNfZlSlWLIqY9zy6MU5mL1-Y";

const imageBaseUrl = "https://image.tmdb.org/t/p/w200";
//const url = "https://api.themoviedb.org/3/authentication";

async function fetchAuthenticatedData() {
  const url = `${baseUrl}/movie/popular`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: bearerToken,
    },
  };

  const movieDiv = document.getElementById("movies");

  try {
    const responce = await fetch(url, options);

    if (!responce.ok) {
      throw new Error(`an error occurred: ${responce.status}`);
    }

    const data = await responce.json();

    // clear movie div
    movieDiv.innerHTML = "";

    // iterate over the movies and create HTML element for each movie

    data.results.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      const title = document.createElement("h2");
      title.textContent = movie.title;

      const overview = document.createElement("p");
      overview.textContent = movie.overview;

      const image = document.createElement("img");
      image.src = `${imageBaseUrl}${movie.poster_path}`;
      image.alt = movie.title;

      movieElement.appendChild(title);
      movieElement.appendChild(overview);
      movieElement.appendChild(image);

      movieDiv.appendChild(movieElement);
    });
  } catch (error) {
    console.error("error fetching data: ", error);
    movieDiv.textContent = "failed to load movies. ";
  }
}

fetchAuthenticatedData();

