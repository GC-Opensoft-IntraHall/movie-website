import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { mockMovies } from "../data/mockData";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [similar, setSimilar] = useState<any[]>([]);

  useEffect(() => {
    // Simulate search results
    const searchResults = mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(searchResults);

    // Simulate similar suggestions based on category
    const similarMovies = mockMovies.filter(movie =>
      movie.category === searchResults[0]?.category &&
      !searchResults.includes(movie)
    );
    setSimilar(similarMovies);
  }, [query]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-muted-foreground mb-8">
          Found {results.length} results
        </p>

        {results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
              {results.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>

            {similar.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Similar Suggestions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {similar.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p>No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
}