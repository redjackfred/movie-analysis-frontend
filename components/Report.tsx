import getRatings from "../utils/getRatings";
import getMovieDetails from "../utils/getMovieDetails";
import ScoreCard from "./ScoreCard";
import { LayoutGrid } from "./ui/layout-grid";
import HeroSection from "./HeroSection";


export default async function Report({
  imdbId,
  title,
  movieId,
}: {
  imdbId: string;
  title: string;
  movieId: number;
}) {
  const ratings = await getRatings(imdbId, title);
  const myRatingCards = await prepareRatings(ratings);
  const movieDetails = await getMovieDetails(movieId);
  const posterPath = await preparePosterPath(movieDetails);

  return (
    <div className="w-full mx-auto h-full">     
      <HeroSection posterPath={posterPath} title={title} imdbId={imdbId} />   
      <div className="w-full h-auto flex-col">
        <div className="px-12 max-w-7xl mx-auto gap-3 relative">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
            <ScoreCard
              score={ratings.imdb_rating}
              source={"IMDb"}
              imdbId={ratings.imdb_id}
              title={ratings.title}
            />
            <ScoreCard
              score={75}
              source={"Rotten Tomatoes"}
              imdbId={ratings.imdb_id}
              title={ratings.title}
            />
            <ScoreCard
              score={ratings.metacritic_rating}
              source={"Metacritic"}
              imdbId={ratings.imdb_id}
              title={ratings.title}
            />
            <ScoreCard
              score={ratings.letterboxd_rating}
              source={"Letterboxd"}
              imdbId={ratings.imdb_id}
              title={ratings.title}
            />
            <ScoreCard
              score={ratings.cinemascore_rating}
              source={"Cinemascore"}
              imdbId={ratings.imdb_id}
              title={ratings.title}
            />
          </div>
        </div>
        <div className="h-auto mx-auto mt-3 relative">
          <LayoutGrid cards={myRatingCards} />
        </div>
      </div>         
    </div>
  );
}

const Skeleton = ({ detail, title, score }: { detail: any; title: string, score: number }) => { 
  return (
    <div>
      <div className="relative text-8xl left-2/3 ">
        {score}
      </div>
      <p className="font-bold md:text-4xl text-xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {detail.commentary}
      </p>      
    </div>
  );
};

async function preparePosterPath(movieDetails: { [key: string]: any }) {
  const posterPath =
    "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path;

  return posterPath;
}

async function prepareRatings(ratings: { [key: string]: any }) {
  const myRatingCards = [];
  // placeholder images
  const imgs = [
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  for (const key in ratings) {
    if (Object.prototype.hasOwnProperty.call(ratings, key)) {
      const rating = ratings[key];
      const title = key
        .replace(/_/g, " ")
        .replace(/rating/g, "")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      if (typeof rating === "object") {
        myRatingCards.push({
          id: myRatingCards.length + 1,
          content: <Skeleton detail={rating} title={title} score={rating.rating}/>,
          className: "md:col-span-1",
          title: title,
          rating: rating,
          thumbnail: imgs[myRatingCards.length % 4],
        });
      }
    }
  }

  return myRatingCards;
}
