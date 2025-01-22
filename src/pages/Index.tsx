import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import { mockMovies, categories } from "../data/mockData";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [allMovies, setAllMovies] = useState(mockMovies);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const nextMovie = useCallback(() => {
    if (!isAutoplayPaused) {
      setIsTransitioning(true);
      setCurrentMovieIndex((prev) => (prev + 1) % mockMovies.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isAutoplayPaused]);

  const previousMovie = useCallback(() => {
    setIsTransitioning(true);
    setCurrentMovieIndex((prev) => 
      prev === 0 ? mockMovies.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  useEffect(() => {
    if (!isAutoplayPaused) {
      const interval = setInterval(nextMovie, 8000);
      return () => clearInterval(interval);
    }
  }, [nextMovie, isAutoplayPaused]);

  const loadMore = useCallback(() => {
    setAllMovies(prev => [...prev, ...mockMovies]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100
        >= document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  const featuredMovie = mockMovies[currentMovieIndex];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <img
            src={featuredMovie.poster}
            alt={featuredMovie.title}
            className={`h-full w-full object-cover transition-all duration-700 ${
              isTransitioning ? 'scale-105 brightness-50' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-2xl space-y-4">
            {/* Title & Rating */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="rounded bg-white/20 px-2 py-1 text-sm font-medium backdrop-blur-sm">
                  {featuredMovie.year}
                </span>
                <span className="text-sm text-gray-300">2h 30m</span>
                <span className="rounded bg-red-500/20 px-2 py-1 text-sm font-medium text-red-500 backdrop-blur-sm animate-pulse">
                  NEW
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
                {featuredMovie.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 animate-fade-in line-clamp-3">
              {featuredMovie.description || "An epic adventure that will keep you on the edge of your seat."}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 animate-fade-in">
              <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/90">
                <Play className="h-5 w-5" /> Play Now
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-white/20 px-6 py-3 font-semibold backdrop-blur-sm transition-colors hover:bg-white/30">
                <Info className="h-5 w-5" /> More Info
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 right-8 flex items-center gap-4">
          <button
            onClick={() => setIsAutoplayPaused(!isAutoplayPaused)}
            className="rounded-full bg-black/50 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {isAutoplayPaused ? (
              <Play className="h-5 w-5" />
            ) : (
              <span className="h-5 w-5 rounded-sm bg-white" />
            )}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full bg-black/50 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Category Carousels */}
      <div className="relative -mt-8 py-8 z-10">
        {categories.map((category) => (
          <MovieCarousel
            key={category}
            title={category}
            movies={mockMovies}
          />
        ))}
      </div>

      {/* Trending Now Section */}
      <div className="px-4 py-9 md:px-16">
        <h2 className="text-2xl font-semibold mb-6">Trending Now</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {allMovies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
}