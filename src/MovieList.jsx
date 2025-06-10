import { useState, useEffect } from "react";

const fetchData = async () => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const MovieList = () => {
  useEffect(() => {
    fetchData();
  }, []);
  return <div>MOVIE LIST</div>;
};

export default MovieList;
