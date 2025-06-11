import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
const MovieList = ({movies, setOverlay, loadMoreMovies,genres }) => {

  return (
    <main>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            genres={genres}
            key={movie.id}
            movie={movie}
            setOverlay={setOverlay}
          ></MovieCard>
        ))}
      </div>
      <p>
        <button
          onClick={() => {
            loadMoreMovies();
          }}
        >
          Load More
        </button>
      </p>
    </main>
  );
};

export default MovieList;
