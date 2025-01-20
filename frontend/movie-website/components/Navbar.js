"use client";

import { useState } from "react";
import MovieListItem from "./MovieListItem";
import { ComboboxDemo } from "./SearchBar/combo";

export default function Navbar() {
  const host = "http://localhost:5000/";
  const [Movies, setMovies] = useState([]);

  const handleMovieName = async (e) => {
    // if (!e.target.value) {
    //   setMovies([]); // Clear the state
    //   return;
    // }

    const response = await fetch(
      `${host}api/movies/autocomplete?t=${e.target.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem('token')
        },
      }
    );
    const json = await response.json(); //Parsing the json
    console.log(json);
    setMovies(json);
  };

  const getMovies = async () => {
    //API Call
  };
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">JungliMoviez</span>
        </a>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center relative">
          <ComboboxDemo />
          {/* <input
            type="text"
            placeholder="Search..."
            className="bg-white text-black rounded-xl border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-base px-4 py-2 w-96"
            onChange={handleMovieName}
          /> */}
          {/* <div className="absolute top-full mt-2 w-full rounded shadow-lg">
            {Movies.map((movie, index) => (
              <MovieListItem
                key={index}
                movieName={movie.title}
                movieImage={movie.poster}
              />
            ))}
          </div> */}
        </div>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Sign In
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
