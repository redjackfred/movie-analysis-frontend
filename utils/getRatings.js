
export default async function getRatings(imdbid, title) {
    let request = "http://localhost:8080/generateReport?imdbid="+ imdbid +"&title=" + title;
    const {Results} = await getPublicRatings(imdbid).then((res) => res.json());  

    for (const rating of Results) {
        console.log(rating);
        if (rating.Source === "IMDb") {
            request += "&IMDbRating=" + rating.Rating;
        }
        else if (rating.Source === "Rotten Tomatoes") {
            request += "&RottenTomatoesRating=" + rating.Rating;
        }
        else if (rating.Source === "Metacritic") {
            request += "&MetacriticRating=" + rating.Rating;
        }        
    }
    console.log(request);
    
    const response = await fetch("http://localhost:8080/generateReport?imdbid="+ imdbid +"&title=" + title)  
    .then((res) => res.json());  

    return response;
}

async function getPublicRatings(imdbid) {
    let response = await fetch("http://localhost:8080/getPublicRatings?imdbid="+ imdbid)    
    // Sometimes omdb doesn't work, so we need to fetch again  
    if(response.Results === undefined || response.Results.length === 0){
        response = await fetch("http://localhost:8080/getPublicRatings?imdbid="+ imdbid)
    }


    return response;
}