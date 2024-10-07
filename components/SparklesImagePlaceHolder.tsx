"use client";
import { SparklesCore } from "./ui/sparkles";

export function SparklesImagePlaceHolder({id} : {id: string}) {
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md"> 
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id={id}
          background="transparent"
          minSize={0.6}
          maxSize={2}
          particleDensity={200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        No Image
      </h1>
    </div>
  );
}
