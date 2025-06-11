import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
const MovieList = ({movies, setOverlay, loadMoreMovies }) => {

  return (
    <div>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
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
    </div>
  );
};

export default MovieList;
