import StoryTimeline from "@/components/StoryTimeline";

export default async function Home({searchParams}: {searchParams: { [key: string]: string }}) {
    const movieId = searchParams?.movieid;
    const title = searchParams?.title;

    const response = await fetch(`http://localhost:8080/getStoryTimeline?imdbid=${movieId}&title=${title}`);
    console.log(response);
    const data = await response.json();
    const { story_timeline, overview } = data;

    return(
        <div className="bg-[#0a0a0a]">
            <StoryTimeline storyTimelineData={story_timeline} overview={overview}/>
            <div className="relative h-[50vh]"></div>
        </div>
    );
};
