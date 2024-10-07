"use client";
import MovieCard from "@/components/MovieCard";
import SearchForm from "@/components/SearchForm";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useState, useEffect, useRef } from "react";

interface Movie {
  id: number;
  title: string;
  genres: string[];
  posterURL: string;
  releaseDate: string;
  popularity: number;
  language: string;
  overview: string;
}

interface MovieResults {
  results: Movie[];
}



export default function Home() {
  const [movieResults, setMovieResults] = useState<MovieResults | null>(null);
  const movieCardsRef = useRef<HTMLDivElement>(null);

  const handleResults = (results: MovieResults) => {
    setMovieResults(results);
    // You can also add more logic here if needed
    console.log(results.results);
  };

  useEffect(() => {
    if (movieResults && movieCardsRef.current) {
      movieCardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [movieResults]);

  return (
    <div className="bg-black">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-4xl md:text-6xl lg:text-8xl text-white font-bold inter-var text-center">
          Movie Analyzer
        </p>
        <p className="text-base md:text-lg my-8 text-white font-normal inter-var text-center">
          Professional movie ratings and reviews powered by OpenAI
        </p>
        <SearchForm onResults={handleResults} />
      </WavyBackground>     
      <div ref={movieCardsRef} className="w-3/4 h-full px-10 grid grid-cols-1 md:grid-cols-3 mx-auto gap-4 relative">
        {movieResults?.results
          .sort((a, b) => b.popularity - a.popularity)
          .map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genres={movie.genres}
              posterPath={movie.posterURL}
              releaseDate={movie.releaseDate}
              popularity={movie.popularity}
              language={movie.language}
              overview={movie.overview}
            />
          ))}
      </div>
    </div>
  );
}
