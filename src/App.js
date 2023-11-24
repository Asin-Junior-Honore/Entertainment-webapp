import "./App.css";
import LoginForm from "./pages/LoginForm";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tvseries from "./pages/Tvseries";
import Bookmarks from "./pages/Bookmarks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./pages/Movie";
import uuid from "react-uuid";
import Honore from "../src/Assets/Dev-Honore.jpg";
function App() {
  const [bookmark, setBookmark] = useState(
    JSON.parse(localStorage.getItem("bookmark")) || []
  );
  const [bookmarkpost, setBookmarkpost] = useState(
    JSON.parse(localStorage.getItem("bookmarkpost")) || []
  );

  useEffect(() => {
    window.localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }, [bookmark]);

  useEffect(() => {
    window.localStorage.setItem("bookmarkpost", JSON.stringify(bookmarkpost));
  }, [bookmarkpost]);

  const addbookMark = (movie) => {
    setBookmark([...bookmark, { id: uuid(), filme: movie, bkmarked: false }]);
  };

  const addbookMarkposter = (movieposter) => {
    setBookmarkpost([
      ...bookmarkpost,
      { id: uuid(), filme: movieposter, bkmarked: false },
    ]);
  };

  const removebookMark = (id) => {
    setBookmark(bookmark.filter((movie) => movie.id !== id));
    window.location.reload();
  };

  const removebookMarkposter = (id) => {
    setBookmarkpost(
      bookmarkpost.filter((movieposter) => movieposter.id !== id)
    );
    window.location.reload();
  };

  const toggleMarked = (id) => {
    setBookmark(
      bookmark.map((movie) =>
        movie.id === id ? { ...movie, bkmarked: !movie.bkmarked } : movie
      )
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Router>
          <>
            <div className="mainnav">
              <div id="logo">
                <FontAwesomeIcon id="redicon" icon={faClapperboard} />
              </div>
              <div className="navs">
                <Link className="links" to={"/"}>
                  <FontAwesomeIcon className="navicons" icon={faHouse} />
                </Link>
                <Link className="links" to={"/movie"}>
                  <FontAwesomeIcon className="navicons" icon={faFilm} />
                </Link>
                <Link className="links" to={"/tvseries"}>
                  <FontAwesomeIcon className="navicons" icon={faTv} />
                </Link>
                <Link className="links" to={"/bookmarks"}>
                  <FontAwesomeIcon className="navicons" icon={faBookmark} />
                </Link>
              </div>

              <div id="user">
                <img id="userpic" src={Honore} />
              </div>
            </div>
          </>
          <Routes>
            <Route
              index
              path="/"
              element={
                <Home
                  addbookMark={addbookMark}
                  addbookMarkposter={addbookMarkposter}
                />
              }
            />
            <Route
              exact
              path="/movie"
              element={
                <Movie
                  bookmark={bookmark}
                  addbookMark={addbookMark}
                  addbookMarkposter={addbookMarkposter}
                  toggleMarked={toggleMarked}
                />
              }
            />
            <Route
              exact
              path="/tvseries"
              element={
                <Tvseries
                  addbookMark={addbookMark}
                  addbookMarkposter={addbookMarkposter}
                />
              }
            />
            <Route
              exact
              path="/bookmarks"
              element={
                <Bookmarks
                  bookmark={bookmark}
                  bookmarkpost={bookmarkpost}
                  removebookMark={removebookMark}
                  removebookMarkposter={removebookMarkposter}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
