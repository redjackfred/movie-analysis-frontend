export default async function searchMovie(title) {
  console.log("searchMovie: " + title);
    const response = await fetch(
      "http://localhost:8080/movies/searchMovie?title=" + title
    ).then((res) => res.json());
  
    return response;
  }
