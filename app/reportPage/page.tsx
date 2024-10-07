import Report from "@/components/Report";

export default async function Home() {
   
  return (
    <div className="bg-black">  
      <Report movieId={672} imdbId = {"tt0241527"} title ={"Harry Potter and the Sorcerer's Stone"}/>
    </div>
  );
}
