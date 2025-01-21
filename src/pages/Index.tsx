import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import MovieCard from "../components/MovieCard";
import { mockMovies, categories } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

export default function Index() {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [allMovies, setAllMovies] = useState(mockMovies);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextMovie = () => {
    setIsTransitioning(true);
    setCurrentMovieIndex((prev) => (prev + 1) % mockMovies.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const previousMovie = () => {
    setIsTransitioning(true);
    setCurrentMovieIndex((prev) => 
      prev === 0 ? mockMovies.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextMovie();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadMore = () => {
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

  const featuredMovie = mockMovies[currentMovieIndex];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <img
          src={featuredMovie.poster}
          alt={featuredMovie.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isTransitioning ? 'scale-105 opacity-70' : 'scale-100 opacity-100'
          }`}
        />
        <div className="hero-gradient" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {featuredMovie.title}
            </h1>
            <p className="text-lg mb-6 animate-fade-in">
              {featuredMovie.description}
            </p>
            <Button size="lg" className="gap-2 animate-fade-in">
              <Play className="h-5 w-5" /> Watch Now
            </Button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
            onClick={previousMovie}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
            onClick={nextMovie}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
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