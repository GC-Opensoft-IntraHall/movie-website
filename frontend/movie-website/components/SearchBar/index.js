"use client";

import * as React from "react";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Replace with your Popover component path
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command"; // Replace with your Command component path

export function SearchBar() {
  const [query, setQuery] = useState(""); // Search query
  const [results, setResults] = useState([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch results from the database
  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch("/api/frameworks"); // Replace with your API endpoint
      const data = await response.json();
      setResults(data.results); // Adjust based on API response
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      fetchResults(value);
    } else {
      setResults([]); // Clear results if query is empty
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Popover-Based Dropdown */}
      <div>
        {/* <h3 className="mb-2 font-semibold">Popover-Based Search Bar</h3> */}
        <Popover>
          <PopoverTrigger asChild>
            <input
              type="text"
              placeholder="Search Movies..."
              value={query}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
          </PopoverTrigger>
          <PopoverContent className="mt-2">
            {loading && <p>Loading...</p>}

            {!loading && results.length > 0 ? (
              <ul>
                {results.map((result, index) => (
                  <li key={index} className="py-1 border-b">
                    {result.name} {/* Replace with your data structure */}
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p>No such Titles</p>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {/* Command-Based Search Modal */}
    </div>
  );
}
