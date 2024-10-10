'use client'
import { useMemo, useState } from 'react';
import * as THREE from 'three';
import dynamic from 'next/dynamic';  
import SpriteText from 'three-spritetext';  

// Dynamic import for the force-graph library to avoid SSR issues  
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });  

const Graph = ({graphData}:{graphData: any}) => {  
  const NODE_R = 4;
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<{ id: string } | null>(null);

  const textureLoader = new THREE.TextureLoader();
  const nodeTextures = useMemo(() => {
    const textures: { [key: string]: THREE.Texture } = {};
    if (typeof window !== 'undefined' && graphData && graphData.nodes) {
      graphData.nodes.forEach((node: any) => {
      if (node.imageURL) {
        if (!textures[node.id]){
          textures[node.id] = textureLoader.load(node.imageURL);
        }
      }
      });
    }
    return textures;
  }, [graphData, textureLoader]);
  

  const data = useMemo(() => {
   // cross-link node objects  
   if(!graphData || !graphData.nodes || !graphData.links) return {nodes: [], links: []};
   graphData.links.forEach((link:any) => {   
    const a = graphData.nodes.find((node:any) => node.id === link.source);
    const b = graphData.nodes.find((node:any) => node.id === link.target);
    !a.neighbors && (a.neighbors = []);
    !b.neighbors && (b.neighbors = []);
    a.neighbors.push(b);
    b.neighbors.push(a);

    !a.links && (a.links = []);
    !b.links && (b.links = []);
    a.links.push(link);
    b.links.push(link);
  });

  return graphData;
}, []);

  
  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node:any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node !== null && node !== undefined) {
      highlightNodes.add(node);
      node.neighbors.forEach((neighbor:any) => highlightNodes.add(neighbor));
      node.links.forEach((link:any) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link:any) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link !== null && link !== undefined) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  return (  
    <div className='relative flex w-full h-full justify-center items-center'>   
    {hoverNode &&
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '10px', borderRadius: '5px' }}>
      {hoverNode.id}
    </div>}
    <ForceGraph3D  
      graphData={data}      
      nodeLabel="id"
      nodeRelSize={NODE_R}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 0.5 : 0}
      linkWidth={link => highlightLinks.has(link) ? 1 : 0.1}    
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
      nodeThreeObject={(node: any) => {  
        const map = nodeTextures[node.id];        
        if(map === undefined || map === null) {
          const spriteText = new SpriteText(node.id);
          highlightNodes.has(node) ? spriteText.color = 'yellow' : getRandomLightColor();
          highlightNodes.has(node) ? spriteText.textHeight = 6 : spriteText.textHeight = 2;        
          return spriteText;
        }
        const material = new THREE.SpriteMaterial({ map: map });
        const sprite = new THREE.Sprite( material );
        sprite.scale.set(10, 10, 1);        
        const spriteText = new SpriteText(node.id);          
        highlightNodes.has(node) ? spriteText.color = 'yellow' : getRandomLightColor();
        highlightNodes.has(node) ? spriteText.textHeight = 0.3 : spriteText.textHeight = 0.2;  

        sprite.add(spriteText);
            
        return sprite;  
      }}  
      linkThreeObjectExtend={true}
      linkThreeObject={(link: any) => {
        // extend link with text sprite        
        const sprite = new SpriteText(link.relation);
        highlightLinks.has(link) ? sprite.color = 'lightblue' : 'lightgrey';     
        highlightLinks.has(link) ? sprite.textHeight = 3.5 : sprite.textHeight = 1;      
        return sprite;
      }}
      linkPositionUpdate={getMiddlePos}
      
    />  
    </div>
  );  
};  

export default Graph;  


const getMiddlePos = (sprite: any, { start, end }: { start: { x: number, y: number, z: number }, end: { x: number, y: number, z: number } }) => {
  const middlePos = ['x', 'y', 'z'].reduce((acc, c) => {
    acc[c as 'x' | 'y' | 'z'] = (start as any)[c] + ((end as any)[c] - (start as any)[c]) / 2; // calc middle point
    return acc;
  }, {} as { [key in 'x' | 'y' | 'z']: number });

  // Position sprite
  Object.assign(sprite.position, middlePos);
}

const getRandomLightColor = () => {
  const letters = 'BCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};