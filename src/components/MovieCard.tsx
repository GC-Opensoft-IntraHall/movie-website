import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "./ui/button";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  year: string;
}

export default function MovieCard({ id, title, poster, year }: MovieCardProps) {
  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <img src={poster} alt={title} className="aspect-[2/3]" />
      <div className="movie-card-overlay flex items-end p-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{year}</span>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}