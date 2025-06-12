import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./SearchBar.jsx";
import MovieList from "./MovieList.jsx";
import SideBar from "./SideBar.jsx";

const App = () => {
  const [overlay, changeOverlay] = useState("");
  const [searchPrompt, changePrompt] = useState("");
  const [sortMethod, setSortMethod] = useState("popularity.desc");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [gridMode, setGridMode] = useState("home");
  const [faves, setFaves] = useState([]);
  const [watched, setWatched] = useState([]);
  /**
   * After a search prompt is changed, this executes the search
   * @param {*} inputSearchPrompt
   */
  const runSearch = (inputSearchPrompt) => {
    setMovies([]);
    changePrompt(inputSearchPrompt);
    search(false, true, undefined, inputSearchPrompt);
  };

  /**
   * Grabs a page of movies from the API and loads them into the movies array
   * @param {Boolean} pageAhead If the current search is just being expanded to load more data
   * @param {Boolean} newStart If the current search is replacing all current movies
   * @param {String} localSort If the sortMethod state is outdated, this overrides it
   * @param {String} localSearch If the searchPrompt state is outdated, this overrides it
   * @returns
   */
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
        //if advancing pages, new page needed
        currPage++;
      }
      if (newStart) {
        //if starting anew, start on page 1
        currPage = 1;
      }
      if (localSearch.length == 0) {
        //Grab movies by sorting method
        apiCall = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currPage}&sort_by=${localSort}`;
      } else {
        //Grab movies by search
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
      //if not a new start, keep current movies
      if (!newStart) {
        for (let i = 0; i < movies.length; i++) {
          newMovies.push(movies[i]);
        }
      }
      //Add only movies with a valid poster
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

  /**
   * Loads the list of genres from the server into a local state
   */
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
    }
  };
  /**
   * Loads more movies, matching the current search prompt / ordering
   */
  const loadMoreMovies = async () => {
    search(true);
  };

  /**
   * Toggles the status of a movie in a user-specific list
   * @param {Movie} movie the movie to toggle status of
   * @param {String} list Either "faves" or "watched", indicating which list status to toggle
   */
  const toggleStatus = (movie, list) => {
    let inList = false;
    let newList = [];
    if (list == "faves") {
      for (let i = 0; i < faves.length; i++) {
        if (faves[i].id == movie.id) {
          inList = true;
        } else {
          newList.push(faves[i]);
        }
      }
      if (!inList) {
        newList.push(movie);
      }
      setFaves(newList);
    } else if (list == "watched") {
      for (let i = 0; i < watched.length; i++) {
        if (watched[i].id == movie.id) {
          inList = true;
        } else {
          newList.push(watched[i]);
        }
      }
      if (!inList) {
        newList.push(movie);
      }
      setWatched(newList);
    }
  };

  /**
   * Handles a sort method change
   * @param {Event} event The event (triggered from the select element) triggering the sort method change
   */
  const handleSortMethodChange = (event) => {
    if (sortMethod != event.target.value) {
      setSortMethod(event.target.value);
      setMovies([]);
      changePrompt("");
      search(false, true, event.target.value, "");
    }
  };

  const changeGridMode = (gridMode) => {
    if (gridMode == "home") {
      search(false, true);
      setGridMode(gridMode)
    } else if (gridMode == "watched") {
      setMovies(watched);
      setGridMode(gridMode)
    } else if (gridMode == "faves") {
      setMovies(faves);
      setGridMode(gridMode)
    }
  };

  useEffect(() => {
    search();
    loadGenres();
  }, []);
  return (
    <section className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <p>By T.J. Nickerson</p>

        {gridMode == "home" ? (
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
        ) : (
          ""
        )}
      </header>
      <main>
        <MovieList
          genres={genres}
          movies={movies}
          setOverlay={changeOverlay}
          toggleStatus={toggleStatus}
          faves={faves}
          watched={watched}
        ></MovieList>

        <p>
          {gridMode == "home" ? (
            <button
              onClick={() => {
                loadMoreMovies();
              }}
            >
              Load More
            </button>
          ) : (
            ""
          )}
        </p>
      </main>
      <SideBar setGridMode={changeGridMode}></SideBar>
      {overlay}
      <footer>Created & Assigned by Codepath.</footer>
    </section>
  );
};

export default App;
