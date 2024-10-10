import Report from "@/components/Report";
import getRatings from "@/utils/getRatings";
import getMovieDetails from "@/utils/getMovieDetails";
import getIMDbId from "@/utils/getIMDbId";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const movieId = searchParams?.movieId;
  const title = searchParams?.title;

  const details = await getMovieDetails(movieId);
  const imdbId = await getIMDbId(movieId);
  const posterPath = preparePosterPath(details.poster_path);
  const ratings = await getRatings(imdbId, title);
  const myRatingCards = prepareRatings(ratings);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-black">
        {/* <Report movieId={Number(id)} title ={String(title)}/> */}
        <Report
          movieId={Number(movieId)}
          title={title as string}
          imdbId={imdbId}
          posterPath={posterPath}
          ratings={ratings}
          myRatingCards={myRatingCards}
        />
      </div>
    </Suspense>
  );
}

function prepareRatings(ratings: { [key: string]: any }) {
  const myRatingCards = [];
  // placeholder images TODO: replace with actual images
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
          content: (
            <Skeleton
              commentary={rating.commentary}
              title={title}
              score={rating.rating}
            />
          ),
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

const Skeleton = ({
  commentary,
  title,
  score,
}: {
  commentary: string;
  title: string;
  score: number;
}) => {
  return (
    <div>
      <div className="relative text-8xl left-2/3 ">{score}</div>
      <p className="font-bold md:text-4xl text-xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {commentary}
      </p>
    </div>
  );
};

function preparePosterPath(poster_path: string) {
  const posterPath = "https://image.tmdb.org/t/p/w500" + poster_path;

  return posterPath;
}
