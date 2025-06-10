import { useState } from "react";
import "./ModalOverlay.css";
const ModalOverlay = ({ setOverlay, movie }) => {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  console.log(movie);
  return (
    <div
      onClick={function () {
        setOverlay("");
      }}
      className="modal-overlay"
    >
      <section onClick={stopPropagation} className="modal-content">
        <h1> {movie.title}</h1>
        <p>
          Released{" "}
          {new Date(movie.release_date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="movie-overview">{movie.overview}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
      </section>
    </div>
  );
};

export default ModalOverlay;
