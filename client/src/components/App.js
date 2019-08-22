import React from "react";
import { withRouter, Link } from "react-router-dom";
import request from "superagent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: ""
    };
  }

  handleChange(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: newValue
    });
  }

  post() {
    request
      .post("/api/link")
      .send({
        title: this.state.title,
        comment: this.state.comment,
        url: this.state.url
      })
      .end((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    this.props.history.push("/");
  }

  render() {
    return (
      <>
        <Link to="/" style={styles.Link}>
          キャンセル
        </Link>
        <label>
          見出し
          <br />
          <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          コメント
          <br />
          <input
            type="text"
            value={this.state.comment}
            name="comment"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          URL
          <br />
          <input
            type="text"
            value={this.state.url}
            name="url"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <button onClick={e => this.post()}>送信</button>
      </>
    );
  }
}

const styles = {
  Link: {
    display: "block",
    textDecoration: "none",
    color: "#0D3F67",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "0.5em 1.5em 0.5em 0"
  }
};

export default withRouter(App);
