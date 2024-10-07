export default async function getGenreNames() {
    const response = await fetch(
      "http://localhost:8080/getGenres"
    ).then((res) => res.json());
  
    return response;
  }