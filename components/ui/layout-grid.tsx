"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  title: string;
  rating: any;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    // Toggle card selection
    setSelected(selected?.id === card.id ? null : card);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // If the selected card or the overlay is clicked, do not close
    if (selected && !target.closest(".selected-card")) {
      setSelected(null);
    }
  };

  useEffect(() => {
    // Add event listener on component mount
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selected]);

  return (
    <div className="w-full h-full px-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer fixed inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  const title = card.title
    .replace(/_/g, " ")
    .replace(/rating/g, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const rating = card.rating.rating;
  return (
    <motion.div className="flex-col">
      <div className="relative w-full h-40">
        <div className="absolute z-10 px-6 pt-2 text-lg">{title}</div>
        <div className="absolute inset-0 w-1/2 left-1/4 h-1/2 top-1/4 z-10 flex items-center justify-center text-4xl text-center bg-[rgba(255,255,255,0.05)] backdrop-blur-[7px] rounded-lg">
          {rating}
        </div>
      </div>
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        height="200"
        width="200"
        className={cn(
          "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
        )}
        alt="thumbnail"
      />
      <div className="absolute inset-0 bg-black opacity-50" />
    </motion.div>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60] selected-card">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
