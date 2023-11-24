import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Bookmarks = ({
  bookmark,
  bookmarkpost,
  removebookMark,
  removebookMarkposter,
}) => {
  const [backdrop, setBackdrop] = useState([]);
  const [postpath, setPostpath] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    setBackdrop(bookmark);
    setPostpath(bookmarkpost);
  }, []);

  return (
    <div className="Moviewrapper">
      <div className="trending">
        <h2>Bookmarks</h2>
        <div className="backpath">
          <Carousel responsive={responsive}>
            {backdrop.map((drops, key) => (
              <div key={uuid()} className="moviedetails">
                <img
                  src={`https://image.tmdb.org/t/p/w500${drops.filme.backdrop_path}`}
                  className="backdrops"
                />

                <div className="des1">
                  <FontAwesomeIcon
                    className="markicon"
                    id="bookicon"
                    icon={faBookmark}
                    onClick={() => removebookMark(drops.id)}
                  />
                  <p>
                    {drops.filme.release_date} {drops.filme.first_air_date}
                  </p>
                  <ul>
                    <li>movie</li>
                    <li>pG</li>
                  </ul>
                  <br />
                </div>
                <h4>
                  {drops.filme.title} {drops.filme.name}
                </h4>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="recomended" id="bookmarkrecomended">
          <h2>Movies & Tv-Series</h2>
          <div className="postpath">
            {postpath.map((post, key) => {
              return (
                <div key={uuid()} className="moviedetails2">
                  <FontAwesomeIcon
                    className="markicon2"
                    icon={faBookmark}
                    onClick={() => removebookMarkposter(post.id)}
                  />
                  <img
                    src={`http://image.tmdb.org/t/p/w185${post.filme.poster_path}`}
                    className="backdrops"
                  />

                  <div className="des1">
                    <p> {post.filme.release_date} </p>
                    <ul>
                      <li>movie</li>
                      <li className="pgs">pG</li>
                    </ul>
                    <br />
                  </div>
                  <h4>
                    {post.filme.title} {post.filme.name}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
