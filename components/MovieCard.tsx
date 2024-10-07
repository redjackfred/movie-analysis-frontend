'use client'
import Image from "next/image";
import { SparklesImagePlaceHolder } from "./SparklesImagePlaceHolder";
import { v4 as uuid } from 'uuid';

export default function MovieCard({
  id,
  title,
  genres,
  posterPath,
  releaseDate,
  popularity,
  language,
  overview,  
}: {
  id: number;
  title: string;
  genres: string[];
  posterPath: string;
  releaseDate: string;
  language: string;
  popularity: number;
  overview: string;
}) {

  const handleClick = (id: number) => {
    console.log(id); 
    // Call the onMovieClick prop with the movie id
  };

  
  return (
    <div
      className="flex flex-col w-full h-auto bg-gray-800 rounded-lg shadow-lg"
      onClick={() => handleClick(id)}
    >
      {(posterPath === null || posterPath === undefined) ? (<SparklesImagePlaceHolder id={uuid()}/>) : (
        <Image
        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        width={200}
        height={300}
        alt={title}
        className="w-full h-3/4 object-cover rounded-t-lg"
      />
      )}      
      <div className="p-4">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-400">{releaseDate}</p>
        <p className="text-sm text-gray-400">Popularity: {popularity}</p>
        <p className="text-sm text-gray-400">Language: {language}</p>
        <br/>
        <p className="text-sm text-gray-400">{overview}</p>
        <br/>
        <p>Genre:</p>
        {genres.map((genre) => (<p key={genre} className="text-sm text-gray-400"> {genre}</p>))}
      </div>
    </div>
  );
}
