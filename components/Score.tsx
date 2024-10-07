export default function Score({
  score,
  source,
}: {
  score: number | string;
  source: string;
}) {
  let color;
  let unitText = "";

  if (source === "IMDb" && typeof score === "number") {
    color = score < 5.0 ? "tomato" : score < 7.5 ? "orange" : "lightgreen";   
  } else if (source === "Rotten Tomatoes" && typeof score === "number") {
    color = score < 50 ? "tomato" : score < 75 ? "orange" : "lightgreen";
    unitText = "%";
  } else if (source === "Metacritic" && typeof score === "number") {
    color = score < 50 ? "tomato" : score < 75 ? "orange" : "lightgreen";  
  }else if(source === "Letterboxd" && typeof score === "number"){
    color = score < 2.5 ? "tomato" : score < 3.75 ? "orange" : "lightgreen";
  }else if(source === "CinemaScore" && typeof score === "string"){
    // A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F
    color = score === "A+" || score === "A" || score === "A-" || score === "B+" ? "lightgreen" : score === "B" || score === "B-"? "orange" : "tomato";
  }

  return color === "tomato" ? (
    <div className="bg-rose-600/[0.85] relative mx-auto text-6xl h-auto py-8 rounded-xl">
        {score}{unitText}  
    </div>
  ) : color === "orange" ? (
    <div className="bg-amber-600/[0.85] relative text-center text-6xl mx-auto h-auto py-8 rounded-xl">
       {score}{unitText}
    </div>
  ) : (
    <div className="bg-emerald-600/[0.85] relative text-center text-6xl mx-auto h-auto py-8 rounded-xl">
        {score}{unitText} 
    </div>
  );
}
