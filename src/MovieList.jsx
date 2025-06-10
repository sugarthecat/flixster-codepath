import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css"
const MovieList = ({setOverlay}) => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(0);

    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&page=${page+1}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const data = await response.json();
        let newMovies = []
        for(let i = 0; i<movieList.length; i++){
          newMovies.push(movieList[i])
        }
        for(let i = 0; i<data.results.length; i++){
          newMovies.push(data.results[i])
        }
        setMovieList(newMovies);
        setPage(data.page);
        console.log(data);
      } catch (error) {
        console.error(error);
        return error;
      }
    };
  useEffect(() => {
    fetchData();
  }, []);
  const loadMoreMovies= () => {
    fetchData()
  }
  return (
    <div>
      <div className="movie-list">
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} setOverlay={setOverlay} ></MovieCard>
        ))}
      </div>
      <p><button onClick=
      {() => {loadMoreMovies()}}>Load More</button></p>
    </div>
  );
};

export default MovieList;
