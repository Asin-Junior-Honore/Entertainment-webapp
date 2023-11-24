import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/tvseries">Tvseries</Link>
      <Link to="/bookmarked">Bookmarked </Link>
    </div>
  );
};

export default Navbar;
