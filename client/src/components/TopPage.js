import React from "react";
import { Link } from "react-router-dom";

import CardList from "./CardList";
import { TopH1 } from './style.js';

const TopPage = () => {
  return (
    <>
      <TopH1>タイトル</TopH1>
      <Link to="/post" style={styles.Link}>
        投稿
      </Link>
      <CardList />
    </>
  );
};

const styles = {
  Link: {
    display: "inline-block",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#0D3F67",
    borderRadius: "5px",
    padding: "0.5em 1.5em",
    position: "fixed",
    bottom: "20px",
    right: "20px",
  }
};

export default TopPage;
