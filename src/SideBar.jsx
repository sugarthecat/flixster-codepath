import { useState } from "react";
import "./SideBar.css";
const SideBar = ({setGridMode}) => {
  const [hidden, setHidden] = useState(true);

  const toggleHidden = () => {
    setHidden(!hidden);
  };
  const switchToHome = () => {
    setGridMode("home");
  }
  const switchToFaves = () => {
    setGridMode("faves");
  }
  const switchToWatched = () => {
    setGridMode("watched");
  }
  return (
    <div>
      <div className={`side-bar ${hidden ? "" : "offscreen"}`}>
        <button onClick={toggleHidden}>Show</button>
      </div>
      <div className={`side-bar ${!hidden ? "" : "offscreen"}`}>
        <button onClick={toggleHidden}>Hide</button>
        <button onClick={switchToHome}>Home</button>
        <button onClick={switchToFaves}>Favorites</button>
        <button onClick={switchToWatched}>Watched</button>
      </div>
    </div>
  );
};

export default SideBar;
