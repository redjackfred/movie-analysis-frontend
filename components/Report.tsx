'use client'
import ScoreCard from "./ScoreCard";
import { LayoutGrid } from "./ui/layout-grid";
import HeroSection from "./HeroSection";
import BackButton from "./BackButton";
import GenerateRelationButton from "./GenerateRelationButton";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useState, CSSProperties } from "react";
import TakeawayButton from "./TakeawayButton";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  title: string;
  rating: any;
};

export default function Report({  
  title,
  imdbId,
  posterPath,    
  ratings,
  myRatingCards,
  movieId,
}: { 
  title: string | null;
  imdbId: string;
  posterPath: string; 
  ratings: { [key: string]: any };
  myRatingCards: Card[];
  movieId: number;
}) {  
  const [loading, setLoading] = useState(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  function handleCharacterRelationButtonClick() {
    setLoading(true);
  }

  function handleTakeawayButtonClick() {
    setLoading(true);
  }

  return (
    <div className="w-full mx-auto h-full">  
       {loading && (
        <div className="fixed h-full w-full z-50 flex justify-center items-center">
          <ClimbingBoxLoader
            color={'white'}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

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
            <div className="w-full h-full flex flex-col justify-evenly items-center">
              <BackButton />
              <GenerateRelationButton movieId={movieId} onButtonClick={handleCharacterRelationButtonClick} />
              <TakeawayButton movieId={movieId} onButtonClick={handleTakeawayButtonClick}/>
            </div>
          </div>
        </div>
        <div className="h-auto mx-auto mt-3 relative">
          <LayoutGrid cards={myRatingCards} />
        </div>
      </div>         
    </div>
  );
}



