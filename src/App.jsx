import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar.jsx";
import MovieList from "./MovieList.jsx";
import ModalOverlay from "./ModalOverlay.jsx";

const App = () => {
  const [overlay, changeOverlay] = useState("")
  return (
    <div className="App">
      <header className="App-header">

        <SearchBar></SearchBar>
        <select>
          <option>Sort Criteria</option>
        </select>
      </header>
      <MovieList setOverlay={changeOverlay}></MovieList>
      {overlay}
    </div>
  );
};

export default App;
