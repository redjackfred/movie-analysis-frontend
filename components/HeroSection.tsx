export default function HeroSection({ posterPath, title, imdbId }: { posterPath: string; title: string; imdbId: string }) {  
    return (  
        <div   
            className="hero-section bg-gray-800 text-white py-20"   
            style={{  
                backgroundImage: 'url(' + posterPath + ')',  
                backgroundSize: 'cover', // Cover the entire div  
                backgroundPosition: 'center' // Center the background image  
            }}  
        >  
            {/* Semi-transparent overlay */}  
            <div className="absolute inset-0 bg-black opacity-70" />  
            
            <div className="container mx-auto px-4 relative z-10"> {/* Set z-index to ensure content is on top */}  
                <div className="flex flex-col items-center justify-center text-center">  
                    <h2 className="text-5xl font-bold mb-4 shadow-md">{title}</h2>  
                    <p className="text-xl mb-8 shadow-md">Explore the ratings and reviews for {title}</p>  
                    <a  
                        href={`https://www.imdb.com/title/${imdbId}`}  
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"  
                    >  
                        View on IMDb  
                    </a>  
                </div>  
            </div>  
        </div>  
    );  
  };  