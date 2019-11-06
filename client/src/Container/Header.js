import React from "react";
import request from "superagent";
import { withRouter, Link } from "react-router-dom";

class Header extends React.Component {
  logout() {
    request.get("/api/logout").end((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  render() {
    let userFunc;
    if (
      this.props.location.pathname !== "/user/registrations" &&
      this.props.location.pathname !== "/user/login"
    ) {
      userFunc = (
        <div>
          <Link to="/post" style={style.link}>
            新規投稿
          </Link>
          <button
            onClick={() => {
              this.logout();
              this.props.history.push("/user/login");
            }}
            style={style.button}
          >
            ログアウト
          </button>
        </div>
      );
    } else {
      userFunc = "";
    }
    return (
      <header style={style.header}>
        <h1>
          <Link to="/" style={style.link}>
            LinkApp
          </Link>
        </h1>
        {userFunc}
      </header>
    );
  }
}

const style = {
  header: {
    color: "#000",
    backgroundColor: "#0D3F67",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em"
  },
  button: {
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "16px",
    fontFamily: "Hiragino Kaku Gothic ProN",
    border: "none",
    padding: "0",
    cursor: "pointer"
  },
  link: {
    color: "#fff",
    marginRight: "1em"
  }
};

export default withRouter(Header);
