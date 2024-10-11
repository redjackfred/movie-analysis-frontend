"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypingIntro() {
  const words = [          
    {
        text: "Powered",
    },
    {
        text: "by",
    },
    {
        text: "OpenAI",
        className: "text-blue-500 dark:text-blue-500"
    },   
  ];
  return (
    <div>      
      <TypewriterEffectSmooth words={words} className="text-sm"/>     
    </div>
  );
}