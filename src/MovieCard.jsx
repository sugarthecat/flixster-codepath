import { useState } from "react";
import "./MovieCard.css";
import ModalOverlay from "./ModalOverlay";

const MovieCard = ({
  movie,
  setOverlay,
  genres,
  toggleStatus,
  isFavorite,
  isWatched,
}) => {
  let ratingFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,

    style: "decimal",
  });

  const favoriteMovie = (event) => {
    event.stopPropagation();
    toggleStatus(movie, "faves");
  };
  const watchMovie = (event) => {
    event.stopPropagation();
    toggleStatus(movie, "watched");
  };

  return (
    <div
      onClick={function () {
        setOverlay(
          <ModalOverlay
            setOverlay={setOverlay}
            movie={movie}
            genres={genres}
          ></ModalOverlay>
        );
      }}
      className="movie-card"
    >
      <h1>{movie.title}</h1>
      <img
        alt={`The poster for the movie \"${movie.title}\"`}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      ></img>

      <p className="movie-card-rating">
        {"⭐ "}
        {ratingFormat.format(movie.vote_average)}
      </p>
      <p className="movie-card-buttons">
        <span onClick={watchMovie} className={`card-button${isWatched ? " watched": ""}`}>
          👁️
        </span>
        <span onClick={favoriteMovie} className={`card-button${isFavorite ? " liked":""} `}>
          ❤️
        </span>
      </p>
    </div>
  );
};

export default MovieCard;
