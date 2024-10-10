import Image from "next/image";

interface LearningTakeawaysProps {
  poster: string;
  text: string;
}

export default function LearningTakeaways({
  poster,
  text,
}: LearningTakeawaysProps) {
  return (
    <div className="relative">
      <Image src={poster} alt="Poster" width={1000} height={1000}/>
        <div className="absolute w-[75%] h-[75%] top-[12.5%] left-[12.5%] inset-0 flex items-center justify-center text-4xl bg-black bg-opacity-50">
            <div className="relative left-[4.125%]">{text}</div>
        </div>
    </div>
  );
}
