import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={style.header}>
      <h1>
        <Link to="/" style={style.link}>
          LinkApp
        </Link>
      </h1>
      <Link to="/post" style={style.link}>
        新規投稿
      </Link>
      {/* <Link to="">ログアウト</Link> */}
    </header>
  );
};

const style = {
  header: {
    color: "#000",
    backgroundColor: "#0D3F67",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em"
  },
  link: {
    color: "#fff"
  }
};

export default Header;
