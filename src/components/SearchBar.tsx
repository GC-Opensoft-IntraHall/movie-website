import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { mockMovies } from "../data/mockData";

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = mockMovies
        .filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className="absolute right-0 top-0 w-screen max-w-lg">
      <div className="relative">
        <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-none bg-transparent focus-visible:ring-0"
          />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute top-full w-full mt-2 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
            {suggestions.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors"
                onClick={onClose}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{movie.title}</h4>
                  <p className="text-sm text-muted-foreground">{movie.year}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}