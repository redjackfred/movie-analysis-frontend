import LearningTakeaways from "@/components/LearningTakeaways";
import getIMDbId from "@/utils/getIMDbId";
import getMovieDetails from "@/utils/getMovieDetails";
import getTakeaways from "@/utils/getTakeaways";

export default async function Home({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    const movieId = searchParams?.movieid;
    const details = await getMovieDetails(movieId);
    const imdbId = await getIMDbId(movieId);
    const posterPath = preparePosterPath(details.backdrop_path);
    const takeaways = await getTakeaways(imdbId, details.title);

    return(
        <div className="relative h-screen w-screen flex justify-center items-center">            
            <LearningTakeaways poster={posterPath} text={takeaways.learning_takeaways} />            
        </div>
    );
};

function preparePosterPath(poster_path: string) {
    const posterPath = "https://image.tmdb.org/t/p/w500" + poster_path;
  
    return posterPath;
  }
