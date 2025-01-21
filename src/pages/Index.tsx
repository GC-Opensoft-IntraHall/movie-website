import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import MovieCard from "../components/MovieCard";
import { mockMovies, categories } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Play } from "lucide-react";

export default function Index() {
  const [featuredMovie] = useState(mockMovies[0]);
  const [allMovies, setAllMovies] = useState(mockMovies);

  const loadMore = () => {
    // Simulate loading more movies
    setAllMovies([...allMovies, ...mockMovies]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allMovies]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <img
          src={featuredMovie.poster}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {featuredMovie.title}
            </h1>
            <p className="text-lg mb-6">{featuredMovie.description}</p>
            <Button size="lg" className="gap-2">
              <Play className="h-5 w-5" /> Play Now
            </Button>
          </div>
        </div>
      </div>

      {/* Category Carousels */}
      <div className="py-8">
        {categories.map((category) => (
          <MovieCarousel
            key={category}
            title={category}
            movies={mockMovies}
          />
        ))}
      </div>

      {/* Infinite Scroll Grid */}
      <div className="px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">More to Explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allMovies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
}