import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import { mockMovies } from "../data/mockData";
import { FaThumbsUp, FaThumbsDown, FaStar, FaShareAlt } from "react-icons/fa";
import { MdPlayArrow, MdPause, MdFullscreen, MdVolumeUp, MdVolumeMute } from "react-icons/md";

export default function Movie() {

  const host = "http://localhost:5000/";

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);
  const [watchLater, setWatchLater] = useState<boolean>(false);
  
  useEffect(() => {
    // Fetch the movie data based on the id
    fetchMovieDetails(id);
    console.log(id);
  }, [id]);

  const fetchMovieDetails = async (movieId) => {
    // Make your API call to fetch the movie data using movieId
    const response = await fetch(`${host}api/movies/${movieId}`);
    const data = await response.json();
    setMovie(data);
    console.log(data); // Log movie details or handle them accordingly
  };

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
  };

  const handleDislike = () => {
    setLiked(false);
    setDisliked(true);
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment(""); // Clear input
    }
  };

  const handleWatchLater = () => {
    setWatchLater(!watchLater);
  };

  if (!movie) return null;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-16">
        {/*Video Player */}
        <VideoPlayer videoSrc="/assets/video.mp4" />

        {/* Movie Details */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-[2fr,1fr] gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex gap-4 text-ml text-muted-foreground mb-6">{movie.plot}</div>
              <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                <span>{movie.year}</span>
                <span>{movie.category}</span>
              </div>
              <p className="text-lg mb-6">{movie.description}</p>

              {/* Like/Dislike Buttons */}
              <div className="flex gap-4">
                <button
                  className={`flex items-center gap-2 ${liked ? "text-blue-500" : ""}`}
                  onClick={handleLike}
                >
                  <FaThumbsUp /> Like
                </button>
                <button
                  className={`flex items-center gap-2 ${disliked ? "text-red-500" : ""}`}
                  onClick={handleDislike}
                >
                  <FaThumbsDown /> Dislike
                </button>
              </div>

              {/* Rating System */}
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={star <= rating ? "text-yellow-500" : "text-gray-400"}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>

              {/* Watch Later Button */}
              <button
                onClick={handleWatchLater}
                className={`mt-6 px-6 py-2 rounded bg-blue-500 text-white`}
              >
                {watchLater ? "Remove from Watch Later" : "Add to Watch Later"}
              </button>
            </div>

            {/* Movie Info */}
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

        {/* Comments Section */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h3 className="text-lg font-semibold">Leave a Comment</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Comment
          </button>

          {/* Display Comments */}
          <div className="mt-4">
            {comments.length > 0 && (
              <ul className="space-y-2">
                {comments.map((c, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded-md">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {/* <div className="max-w-7xl mx-auto">
          <MovieCarousel title="More Like This" movies={similar} />
        </div> */}

        {/* Share Movie Button */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button className="flex items-center gap-2 text-blue-500">
            <FaShareAlt size={20} /> Share this movie
          </button>
        </div>
      </div>
    </div>
  );
}


interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <div className="relative aspect-video bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};