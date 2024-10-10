export default async function getCharacterRelations(movieId) {
    const response = await fetch(
      "http://localhost:8080/getCharacterRelations?movieid=" + movieId
    ).then((res) => res.json());
  
    return response;
  }