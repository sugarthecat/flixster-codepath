import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
const MovieList = ({movies, setOverlay, loadMoreMovies,genres, toggleStatus,faves,watched }) => {
  const isFavorited = (movie) => {
    let isFav = false;
    for(let i = 0; i<faves.length; i++){
      if(faves[i].id == movie.id){
        isFav = true;
        break;
      }
    }
    return isFav
  }
  const isWatched = (movie) => {
    let seenYet = false;
    for(let i = 0; i<watched.length; i++){
      if(watched[i].id == movie.id){
        seenYet = true;
        break;
      }
    }
    return seenYet
  }
  return (
    <main>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            genres={genres}
            key={movie.id}
            movie={movie}
            setOverlay={setOverlay}
            toggleStatus = {toggleStatus}
            isFavorite = {
              isFavorited(movie)
            }
            isWatched = {
              isWatched(movie)
            }
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
