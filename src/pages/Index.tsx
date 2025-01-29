import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import { Play, Info } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const host = "http://localhost:5000/";

export default function Index() {
  const categories = ["Horror", "Action", "Thriller", "Comedy", "Romance"];

  // Predefined list of movies with local image paths
  const localMovies = [
    {
      id: "1",
      title: "Deadpool 2",
      year: "2023",
      poster: "https://images3.alphacoders.com/678/thumb-1920-678085.jpg", // Replace with your local image path
      description: ""
    },
    {
      id: "2",
      title: "Godzilla vs Kong",
      year: "2022",
      poster: "https://images5.alphacoders.com/135/thumb-1920-1355086.jpeg",
      description: "Explosive action-packed adventure with iconic heroes."
    },
    {
      id: "3",
      title: "Captain America:Civil War",
      year: "2021",
      poster: "https://images5.alphacoders.com/689/thumb-1920-689398.jpg",
      description: "A gripping thriller that will leave you breathless."
    },
  ];

  const [movies, setMovies] = useState(localMovies);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [latestMovies, setLatestMovies] = useState([]);

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total_res, setTotal_res] = useState(0)
  


  const featuredMovie = movies[currentMovieIndex] || {
    poster: "/placeholder.jpg",
    title: "Sample Movie",
    description: "An epic adventure that will keep you on the edge of your seat.",
    year: "2023",
  };

  const fetchLatestMovies = async () => {
    console.log("HI");
    const [latest] = await Promise.all([
      fetch(`${host}api/movies/latest?page=${page}`).then(res => res.json())
    ]);

    const updatedMovies = [...latestMovies, ...latest.movies].reduce((acc, movie) => {
      if (!acc.some(m => m._id === movie._id)) {
        acc.push(movie);
      }
      return acc;
    }, []);

    setLatestMovies(updatedMovies);
    setTotal_res(latest.totalMovies);
    setPage(page+1);
    console.log(latest);

    const x = await latestMovies.length;
    console.log("Fetching LAtest Movies", x)
  };

  useEffect(() => {
    fetchLatestMovies();
  }, []);

  const nextMovie = useCallback(() => {
    if (!isAutoplayPaused) {
      setIsTransitioning(true);
      setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isAutoplayPaused, movies.length]);

  useEffect(() => {
    if (!isAutoplayPaused) {
      const interval = setInterval(nextMovie, 5000);
      return () => clearInterval(interval);
    }
  }, [nextMovie, isAutoplayPaused]);

  const fetchMoreMovies = async () => {
    setLoading(true);
    setPage(page+1);
    fetchLatestMovies();
    setLoading(false);
  }



  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredMovie.poster}
            alt={featuredMovie.title}
            className={`h-full w-full object-cover transition-all duration-700 ${isTransitioning ? "scale-105 brightness-50" : "scale-100"
              }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-2xl space-y-4">
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
            <p className="text-lg text-gray-300 animate-fade-in line-clamp-3">
              {featuredMovie.description}
            </p>
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
      </div>

      {/* Category Carousels */}
      <div className="relative -mt-8 py-8 z-10">
        {categories.map((category) => (
          <MovieCarousel key={category} category={category} />
        ))}
      </div>

      {/* Latest Movies */}
      <div className="px-4 py-9 md:px-16">
        <h2 className="text-2xl font-semibold mb-6">Latest Releases</h2>

        <InfiniteScroll
          dataLength={latestMovies.length}
          next={fetchMoreMovies}
          hasMore={latestMovies.length !== total_res}
          loader={<Spinner />}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {latestMovies.map((movie) => (
              <MovieCard key={movie._id} {...movie} />
            ))}
          </div>
        </InfiniteScroll>
        {loading && <Spinner />}
      </div>
    </div>
  );
}

