import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>
        <Link to="/">LinkApp</Link>
      </h1>
      <Link to="/post">新規投稿</Link>
      <Link to="">ログアウト</Link>
    </>
  );
};

export default Header;
