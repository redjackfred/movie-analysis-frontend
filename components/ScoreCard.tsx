"use client";

import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import Score from "./Score";

interface ScoreCardProps {
  score: number | string; // Ensure this matches what you expect
  source: string;
  imdbId: string;
  title: string;
}

export default function ScoreCard({
  score,
  source,
  imdbId,
  title,
}: ScoreCardProps) {
    let unitText = "";
    let link = "";

    if(source === "Rotten Tomatoes"){
        unitText = "0% - 100%";
        link = "https://www.rottentomatoes.com/m/" + title.toLowerCase().replace(/ /g, "_").replace(/:/g, "").replace(/'/g, "").replace(/&/g, "and");
    }else if(source === "IMDb"){
        unitText = "0.0 - 10.0";
        link = "https://www.imdb.com/title/" + imdbId;
    }else if(source === "Metacritic"){
        unitText = "0 - 100";
        link = "https://www.metacritic.com/movie/"  + title.toLowerCase().replace(/ /g, "-").replace(/:/g, "").replace(/'/g, "").replace(/&/g, "and");
    }else if(source === "Letterboxd"){
        unitText = "0.0 - 5.0";
        link = "https://letterboxd.com/film/" + title.toLowerCase().replace(/ /g, "-").replace(/:/g, "").replace(/'/g, "").replace(/&/g, "and");
    }else if(source === "Cinemascore"){
        unitText = "A+ - F";
        link = "https://www.cinemascore.com/";
    }

  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto lg:w-[24rem]  sm:w-[20rem] h-auto rounded-xl p-8 border bg-[url('/images/rating_background.jpg')] dark:bg-[url('/images/rating_background.jpg')]">
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-neutral-600 dark:text-white"
        >
          {source} Rating
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {unitText}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Score source={source} score={score} />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as={Link}
            href={link}
            target="__blank"
            className="px-4 py-3 rounded-xl bg-black/[0.7] dark:bg-white/[0.7] dark:text-black text-white text-xs font-bold"
          >
            Link to {source}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
