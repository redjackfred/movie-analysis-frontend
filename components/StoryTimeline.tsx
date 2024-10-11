import { Timeline } from "./ui/timeline";

export default function StoryTimeline({storyTimelineData, overview}: {storyTimelineData: any, overview: string}) {
    
const data = storyTimelineData.map((item: any) => ({
    title: item.event,
    content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xl md:text-2xl font-normal mb-8">
                {item.description}
            </p>
        </div>
    ),
}));

  return (
    <div className="w-full">
      <Timeline data={data} overview={overview}/>
    </div>
  );
}
