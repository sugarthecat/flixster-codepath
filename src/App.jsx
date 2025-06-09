import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">

        <SearchBar></SearchBar>
        <select>
          <option>Sort Criteria</option>
        </select>
      </header>
      
    </div>
  );
};

export default App;
