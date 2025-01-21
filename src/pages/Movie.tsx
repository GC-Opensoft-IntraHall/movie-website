import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import { mockMovies } from "../data/mockData";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching movie details
    const found = mockMovies.find(m => m.id === id);
    setMovie(found);

    // Simulate fetching similar movies
    if (found) {
      const similarMovies = mockMovies.filter(m =>
        m.category === found.category && m.id !== found.id
      );
      setSimilar(similarMovies);
    }
  }, [id]);

  if (!movie) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-16">
        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg">Video player placeholder</p>
          </div>
        </div>

        {/* Movie Details */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-[2fr,1fr] gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                <span>{movie.year}</span>
                <span>{movie.category}</span>
              </div>
              <p className="text-lg">{movie.description}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Movie Info</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Genre: </span>
                  {movie.category}
                </p>
                <p>
                  <span className="text-muted-foreground">Release Year: </span>
                  {movie.year}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        <div className="max-w-7xl mx-auto">
          <MovieCarousel
            title="More Like This"
            movies={similar}
          />
        </div>
      </div>
    </div>
  );
}