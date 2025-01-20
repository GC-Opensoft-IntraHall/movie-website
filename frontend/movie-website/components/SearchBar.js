"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@material-tailwind/react";

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(""); // Stores the selected movie title
  const [movies, setMovies] = React.useState([]); // Stores fetched movie data
  const [loading, setLoading] = React.useState(false); // Loading state
  const debounceTimeout = React.useRef(null);

  // Fetch data from OMDB API
  const fetchData = async (query) => {
    if (!query.trim()) return; // Skip fetch if query is empty
    setLoading(true);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=d2af6d5c`
      );
      const data = await response.json();
      setMovies(data.Search || []); // Use `Search` field in the OMDB response
    } catch (error) {
      console.error("Error fetching data:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes with debounce
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      console.log("fetch requeest sent");
      fetchData(searchTerm);
    }, 300); // Adjust debounce time as needed
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setMovies([]); // Clear movies when the popover closes
        }
      }}
    >
      <PopoverTrigger asChild>
        <input
          type="text"
          placeholder="Search Movies..."
          className="w-96 p-0 h-10 rounded-md border px-3 text-sm outline-none"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)} // Open popover when input gains focus
          onBlur={(e) => {
            if (!e.relatedTarget || e.relatedTarget.tagName !== "LI") {
              setOpen(false); // Close the popover only when focus moves outside
            }
          }}
        />
      </PopoverTrigger>
      <Button onClick={() => setOpen(true)}>Search</Button>
      <PopoverContent className="w-96 p-0">
        {" "}
        {/* Adjusted width for better layout */}
        <Command>
          <CommandList>
            {loading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : movies.length > 0 ? (
              <CommandGroup>
                {movies.map((movie) => (
                  <CommandItem
                    key={movie.imdbID}
                    onSelect={() => {
                      setValue(movie.Title); // Set the selected movie title
                      setOpen(false); // Close the popover
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/50x70"
                        }
                        alt={movie.Title}
                        className="h-12 w-8 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{movie.Title}</p>
                        <p className="text-xs text-muted-foreground">
                          {movie.Year}
                        </p>
                      </div>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === movie.Title ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No Movies found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
