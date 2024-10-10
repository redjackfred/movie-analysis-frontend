import Head from "next/head";
import Graph from "@/components/Graph";
import getCharacterRelations from "@/utils/getCharacterRelations";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const movieId = searchParams?.movieid;
  const graphData = await getCharacterRelations(movieId);

  return (
    <div>
      <Head>
        <title>3D Graph Visualization</title>
        <meta
          name="description"
          content="A 3D graph visualization using Next.js and react-force-graph-3d."
        />
        <style>
          {`body { margin: 0; height: 100vh; width: 100vw; overflow: hidden;}`}
        </style>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        {movieId === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <Graph graphData={graphData} />
        )}
      </Suspense>
    </div>
  );
}
