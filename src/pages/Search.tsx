import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const host = import.meta.env.VITE_API_URL;
  
  const handleMovieName = async (query) => {
    if (!query) {
      setResults([]);
      setSimilar([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fuzzy Search
      const response = await fetch(`${host}api/movies/fuzzy?t=${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch fuzzy search results");
      const json = await response.json();
      setResults(json);

      // Semantic Search
      const similarResponse = await fetch(
        `${host}api/movies/semantic-search?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!similarResponse.ok)
        throw new Error("Failed to fetch semantic search results");
      const similarJson = await similarResponse.json();
      setSimilar(similarJson.results || []); // Default to empty if no results
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMovieName(query);
  }, [query]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : results.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-8">
              Found {results.length} results
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
              {results.map((movie) => (
                <MovieCard key={movie._id} {...movie} />
              ))}
            </div>

            {similar.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Similar Suggestions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {similar.map((movie) => (
                    <MovieCard key={movie._id} {...movie} />
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
