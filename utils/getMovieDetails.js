export default async function getMovieDetails(movieId) {
  const response = await fetch(
    "http://localhost:8080/movies?movieid=" + movieId
  ).then((res) => res.json());

  return response;
}
