import React from "react";
import { Link, withRouter } from "react-router-dom";
import request from "superagent";

import CardList from "../components/CardList";

class TopPage extends React.Component {
  componentWillMount() {
    request.get("/api/user/auth").end((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!data.body.auth) {
        this.props.history.push("/user/login");
      }
    });
  }

  render() {
    return (
      <>
        <CardList />
      </>
    );
  }
}

const styles = {
  Link: {
    display: "inline-block",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#0D3F67",
    borderRadius: "5px",
    padding: "0.5em 1.5em"
  }
};

export default withRouter(TopPage);
