import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaThumbsUp, FaPlus, FaStar } from "react-icons/fa";

export default function Movie() {
  const host = "http://localhost:5000/"; // API base URL
  const { id } = useParams(); // Get the movie ID from URL
  const [movie, setMovie] = useState(null); // State for movie data
  const [liked, setLiked] = useState(false); // State to manage liked status
  const [rating, setRating] = useState<number>(0); // State for rating
  const [watchLater, setWatchLater] = useState<boolean>(false); // State for "Watch Later"

  // Fetch movie details when the component mounts or the movie ID changes
  useEffect(() => {
    fetchMovieDetails(id);
    console.log(id); // Debugging: log the movie ID
  }, [id]);

  // Fetch movie details from the API
  const fetchMovieDetails = async (movieId: string) => {
    const response = await fetch(`${host}api/movies/${movieId}`);
    const data = await response.json();
    setMovie(data); // Set the fetched movie data
    console.log(data); // Log the movie data for debugging
  };

  // Handle like button click
  const handleLike = async () => {
    try {
      setLiked(!liked); // Toggle the like status immediately for UI responsiveness
  
      const token = localStorage.getItem("token"); // Retrieve the JWT token from storage
  
      const response = await fetch(`${host}api/users/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to add movie to Watch Later");
      }
  
      console.log("Movie added to Liked Movies:", data);
    } catch (error) {
      console.error("Error adding to Liked Movies:", error.message);
      setLiked(!liked); // Revert state if request fails
    }
  };
  

  // Handle "Watch Later" button click
  const handleWatchLater = async() => {
    try {
      setWatchLater(!watchLater); // Toggle the like status immediately for UI responsiveness
  
      const token = localStorage.getItem("token"); // Retrieve the JWT token from storage
  
      const response = await fetch(`${host}api/users/watchlater/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to add movie to Watch Later");
      }
  
      console.log("Movie added to Watch Later Movies:", data);
    } catch (error) {
      console.error("Error adding to Watch Later:", error.message);
      setLiked(!liked); // Revert state if request fails
    }
  };

  // Return nothing if movie data hasn't loaded
  if (!movie) return null;

  return (
    <div className="min-h-screen">
      <Navbar /> {/* Navbar component */}
      <div className="pt-16">
        {/* Video player */}
        <VideoPlayer videoSrc={movie.videoUrl || "/assets/video.mp4"} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-[2fr,1fr] gap-8">
            <div>
              {/* Movie Title */}
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              {/* Movie Plot */}
              <div className="flex gap-4 text-ml text-muted-foreground mb-6">{movie.plot}</div>
              <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                <span>{movie.year}</span>
                <span>{movie.category}</span>
              </div>
              {/* Movie Description */}
              <p className="text-lg mb-6">{movie.description}</p>

              {/* Like and Watch Later Buttons */}
              <div className="flex gap-12 items-center">
                <button
                  className={`flex items-center gap-2 ${liked ? "text-red-500" : ""}`}
                  onClick={handleLike}
                >
                  <FaThumbsUp /> Like
                </button>
                <button
                  onClick={handleWatchLater}
                  className={`flex items-center gap-2 ${watchLater ? "text-blue-500" : ""}`}
                >
                  Watch Later <FaPlus />
                </button>
              </div>

              
            </div>

            {/* Movie Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Movie Info</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Genre: </span>{movie.category}</p>
                <p><span className="text-muted-foreground">Release Year: </span>{movie.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VideoPlayer component to handle video and skip functionality
interface VideoPlayerProps {
  videoSrc: string; // Video source URL
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element
  const skipDuration = 5; // Amount to skip forward or backward in seconds

  // Function to skip video forward or backward by 5 seconds
  const skipVideo = (direction: "forward" | "backward") => {
    if (videoRef.current) {
      // Calculate new time by adding or subtracting 5 seconds
      let newTime = videoRef.current.currentTime + (direction === "forward" ? skipDuration : -skipDuration);

      // Ensure current time doesn't go below 0 or exceed video duration
      if (newTime < 0) newTime = 0;
      if (newTime > videoRef.current.duration) newTime = videoRef.current.duration;

      videoRef.current.currentTime = newTime; // Set the new time
    }
  };

  return (
    <div className="relative aspect-video bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from propagating
          const rect = e.currentTarget.getBoundingClientRect(); // Get the position of the video element
          const clickX = e.clientX - rect.left; // Get the horizontal position of the click
          const videoWidth = rect.width; // Get the video width
          
          // Skip the video based on where the user clicked
          if (clickX < videoWidth / 10) { // Left side: skip backward
            skipVideo("backward");
          } else if (clickX > videoWidth * 0.9) { // Right side: skip forward
            skipVideo("forward");
          }
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
