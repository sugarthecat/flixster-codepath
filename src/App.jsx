import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar.jsx";
import MovieList from "./MovieList.jsx";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">

        <SearchBar></SearchBar>
        <select>
          <option>Sort Criteria</option>
        </select>
      </header>
      <MovieList></MovieList>
    </div>
  );
};

export default App;
