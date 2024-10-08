export default async function getIMDbId(movieId) {
    const response = await fetch(
      `http://localhost:8080/getIMDbId?movieid=${movieId}`
    ).then((res) => res.json()).then((data) => data.imdb_id);
  
    return response;
  }