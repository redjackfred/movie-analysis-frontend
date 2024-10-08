export default function getMovieDetails(movieId) {
  const response = fetch(
    "http://localhost:8080/movies?movieid=" + movieId
  ).then((res) => res.json());

  return response;
}
