import { useState, useEffect } from "react";
import "./ModalOverlay.css";
const ModalOverlay = ({ setOverlay, movie, genres }) => {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  const [runtime, setRuntime] = useState(0);
  const fetchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const data = await response.json();
      setRuntime(data.runtime);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const loadMoreMovies = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
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
        <p>
          {Math.floor(runtime / 60)}h, {runtime % 60}m
        </p>
        <p className="movie-overview">{movie.overview}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
        <div>
          {movie.genre_ids.map((genre) => {
            let output = genre;
            for(let i = 0; i<genres.genres.length; i++){
              if(genres.genres[i].id == genre){
                output = genres.genres[i].name
              }
            }
            return <span className="genre-card" key={genre}>{output}</span>;
          })}
        </div>
      </section>
    </div>
  );
};

export default ModalOverlay;
