import SearchForm from "@/components/SearchForm";
import { WavyBackground } from "@/components/ui/wavy-background";

export default async function Home() {
  return (    
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-4xl md:text-6xl lg:text-8xl text-white font-bold inter-var text-center">
          Movie Analyzer
        </p>
        <p className="text-base md:text-lg my-8 text-white font-normal inter-var text-center">
          Professional movie ratings and reviews powered by OpenAI
        </p>
        <SearchForm />
      </WavyBackground>     
  );
}
