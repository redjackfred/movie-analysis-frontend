"use client";
import MovieCard from "@/components/MovieCard";
import SearchForm from "@/components/SearchForm";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useState } from "react";

export default function Home() {
  interface Movie {
    id: number;
    title: string;
    genre_ids: number[];
    poster_path: string;
    release_date: string;
    popularity: number;
    original_language: string;
    overview: string;
  }

  interface MovieResults {
    results: Movie[];
  }

  const [movieResults, setMovieResults] = useState<MovieResults | null>(null);

  const handleResults = (results: MovieResults) => {
    setMovieResults(results);
    // You can also add more logic here if needed
    console.log(results.results);
  };

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
      <div className="w-full h-full px-10 grid grid-cols-1 md:grid-cols-3 mx-auto gap-4 relative">
        {movieResults?.results
          .sort((a, b) => b.popularity - a.popularity)
          .map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genreIds={movie.genre_ids}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              popularity={movie.popularity}
              language={movie.original_language}
              overview={movie.overview}
            />
          ))}
      </div>
    </div>
  );
}
