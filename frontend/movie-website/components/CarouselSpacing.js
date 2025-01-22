import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const movies = [
  {
    name: "Inception",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A skilled thief leads a mission into the subconscious mind.",
  },
  {
    name: "The Dark Knight",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Batman faces the Joker in a battle for Gotham's soul.",
  },
  {
    name: "Interstellar",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A journey through space to save humanity's future.",
  },
  {
    name: "The Matrix",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A hacker discovers the truth about his reality.",
  },
  {
    name: "The Lord of the Rings",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A quest to destroy a powerful ring and save Middle-earth.",
  },
];

export function CarouselSpacing() {
  return (
    <Carousel className="w-full h-[px] relative overflow-hidden">
      {/* Carousel Content */}
      <CarouselContent className="flex w-full h-full">
        {movies.map((movie, index) => (
          <CarouselItem
            key={index}
            className="flex-shrink-0 w-full h-full p-2" // Each item takes full width
          >
            <Card className="h-[800px] bg-gray-100 shadow-md rounded-lg overflow-hidden group">
              {/* Movie image as background */}
              <div className="relative w-full h-full">
                <img
                  src={movie.image} // Dynamic movie image
                  alt={movie.name}
                  className="object-cover w-full h-full" // Make the image cover the full area of the card
                />
                {/* Overlay for name and description with black background */}
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-2xl font-bold text-white">{movie.name}</span>
                  <p className="text-sm mt-2 text-white">{movie.description}</p>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Previous and Next Buttons */}
      <CarouselPrevious className="absolute bottom- left-4 transform -translate-y-1/2 text-white bg-black rounded-full p-3" />
      <CarouselNext className="absolute bottom-4 right-4 transform -translate-y-1/2 text-white bg-black rounded-full p-3" />
    </Carousel>
  );
}
