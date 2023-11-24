import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HashLoader } from "react-spinners";
const Tvseries = ({ addbookMark, addbookMarkposter }) => {
  const [backdrop, setBackdrop] = useState([]);
  const [postpath, setPostpath] = useState([]);
  const [loading, setLoading] = useState(null);
  const [value, setValue] = useState("");
  const [isloading, setISloading] = useState(true);

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
    fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=0c1d1512d06f72a1b62a4876eff89834&page=3`
    )
      .then((response) => response.json())
      .then((data) => setBackdrop(data.results.slice(4, 14)));

    const Apidata = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=0c1d1512d06f72a1b62a4876eff89834`
      );
      let data = await response.json();
      setPostpath(data.results);
    };

    Apidata();

    setTimeout(() => {
      setISloading(false);
    }, 4000);
  }, []);

  const handleFetch = () => {
    if (value.length == 0) {
      alert("please type a movie");
    } else {
      const SearchData = async () => {
        let response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=0c1d1512d06f72a1b62a4876eff89834&language=en-us&include_adult=false&query=${value}`
        );
        let data = await response.json();
        setBackdrop(data.results);
        setPostpath(data.results);
      };

      SearchData();
      setValue("");
    }
  };
  return (
    <div className="Moviewrapper">
      <div className="searchcon">
        <input
          type="text"
          placeholder="search for movies or TV series"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <FontAwesomeIcon
          id="icon"
          icon={faMagnifyingGlass}
          onClick={handleFetch}
        />
      </div>

      <div className="trending">
        <h2>Trending Tv-shows for you</h2>
        {isloading ? (
          <HashLoader color="#c87373" />
        ) : (
          <div className="backpath">
            <Carousel responsive={responsive}>
              {backdrop.map((drops, key) => (
                <div key={uuid()} className="moviedetails">
                  <FontAwesomeIcon
                    className="markicon"
                    icon={faBookmark}
                    onClick={() => addbookMark(drops)}
                  />
                  <img
                    src={`https://image.tmdb.org/t/p/w500${drops.backdrop_path}`}
                    className="backdrops"
                  />

                  <div className="des1">
                    <p>{drops.first_air_date} </p>
                    <ul>
                      <li> {drops.media_type} </li>
                      <li>pG</li>
                    </ul>
                    <br />
                  </div>
                  <h4>{drops.name} </h4>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>

      <div className="recomended">
        <h2>Recommended Tv-shows for you</h2>
        {isloading ? (
          <HashLoader color="#c87373" />
        ) : (
          <div className="postpath">
            {postpath.map((post, key) => {
              return (
                <div key={uuid()} className="moviedetails2">
                  <FontAwesomeIcon
                    className="markicon2"
                    icon={faBookmark}
                    onClick={() => addbookMarkposter(post)}
                  />
                  <img
                    src={`http://image.tmdb.org/t/p/w185${post.poster_path}`}
                    className="backdrops"
                  />

                  <div className="des1">
                    <p> {post.first_air_date} </p>
                    <ul>
                      <li>tv</li>
                      <li className="pgs">pG</li>
                    </ul>
                    <br />
                  </div>
                  <h4>{post.name} </h4>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tvseries;
