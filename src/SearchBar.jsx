import { useState } from "react";

const SearchBar = ({ runSearch }) => {
  const search = () => {
    runSearch(searchPrompt)
  };
  const formSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    search();
  };
  const handleInputChange = (event) => {
    setSearchPrompt(event.target.value);
  };
  const [searchPrompt, setSearchPrompt] = useState("");
  return (
    <div>
      <form onSubmit={formSubmit}>
        <button
          onClick={function () {
            setSearchPrompt("");
            search();
          }}
        >
          Clear
        </button>
        <input
          placeholder="Search"
          value={searchPrompt}
          onChange={handleInputChange}
          onKeyDown={function (event) {
            if (event.key == "Enter") {
              event.preventDefault();
              search();
            }
          }}
        />
        <button onClick={search}>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
