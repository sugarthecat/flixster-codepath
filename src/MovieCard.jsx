import { useState } from "react";
import './MovieCard.css'
import ModalOverlay from "./ModalOverlay";

const MovieCard = ({movie, setOverlay}) => {
  return (
    <div onClick={function(){setOverlay(<ModalOverlay setOverlay={setOverlay} movie={movie}></ModalOverlay>)}} className="movie-card">
        <h1>{movie.title}</h1>
        <h2>{movie.year}</h2>
        <img alt={`The poster for the movie \"${movie.title}\"`} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
    </div>
  );
};

export default MovieCard;
