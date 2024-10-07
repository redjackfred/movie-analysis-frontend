
export default async function getRatings(imdbid, title) {
    const response = await fetch('http://localhost:8080/generateReport?imdbid='+ imdbid +'&title=' + title)  
    .then((res) => res.json());  

    return response;
}