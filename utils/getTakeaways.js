export default async function getTakeaways(imdbid, title) {  
    const response = await fetch(
        "http://localhost:8080/generateLearningTakeaways?imdbid="+ imdbid +"&title=" + title
      ).then((res) => res.json());
    
      return response;
}