import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./SearchBar.jsx";
import MovieList from "./MovieList.jsx";
import ModalOverlay from "./ModalOverlay.jsx";

const App = () => {
  const [overlay, changeOverlay] = useState("");
  const [searchPrompt, changePrompt] = useState("");
  const [sortMethod, setSortMethod] = useState("popularity.desc");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const runSearch = (inputSearchPrompt) => {
    setMovies([]);
    changePrompt(inputSearchPrompt);
    search(false, true, undefined, inputSearchPrompt);
  };
  const search = async (
    pageAhead = false,
    newStart = false,
    localSort = sortMethod,
    localSearch = searchPrompt
  ) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      let apiCall = "";
      let currPage = page;
      if (pageAhead) {
        currPage++;
      }
      if (newStart) {
        currPage = 1;
      }
      if (localSearch.length == 0) {
        //search
        apiCall = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currPage}&sort_by=${localSort}`;
      } else {
        apiCall = `https://api.themoviedb.org/3/search/movie?query=${localSearch.replaceAll(
          " ",
          "%20"
        )}&include_adult=false&language=en-US&page=${currPage}`;
      }
      const response = await fetch(apiCall, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      let newMovies = [];
      if (!newStart) {
        for (let i = 0; i < movies.length; i++) {
          newMovies.push(movies[i]);
        }
      }
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].poster_path != null) {
          newMovies.push(data.results[i]);
        }
      }
      setMovies(newMovies);
      setPage(data.page);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const loadGenres = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiCall = `https://api.themoviedb.org/3/genre/movie/list?language=en'`;

      const response = await fetch(apiCall, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  useEffect(() => {
    search();
    loadGenres();
  }, []);
  const loadMoreMovies = async () => {
    search(true);
  };

  const handleSortMethodChange = (event) => {
    if (sortMethod != event.target.value) {
      setSortMethod(event.target.value);
      setMovies([]);
      changePrompt("");
      search(false, true, event.target.value, "");
    }
  };
  return (
    <section className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <p>By T.J. Nickerson</p>
        <nav>
          <SearchBar prompt={searchPrompt} runSearch={runSearch}></SearchBar>
          <select value={sortMethod} onChange={handleSortMethodChange}>
            <option value="popularity.desc">Vote Average</option>
            <option value="original_title.asc">Alphabetical (A-Z)</option>
            <option value="primary_release_date.desc">
              Release Date (Newest To Oldest)
            </option>
          </select>
        </nav>
      </header>
      <MovieList
        genres={genres}
        movies={movies}
        setOverlay={changeOverlay}
        loadMoreMovies={loadMoreMovies}
      ></MovieList>
      {overlay}
      <footer>Created & Assigned by Codepath.</footer>
    </section>
  );
};

export default App;
