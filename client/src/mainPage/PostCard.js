import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";

import { addLinkCard } from "../reducer/modules/linkCards";

class PostCard extends React.Component {
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
    this.props.addLinkCard({
      title: this.state.title,
      comment: this.state.comment,
      url: this.state.url
    });
    this.props.history.push("/");
  }

  render() {
    const displayStyle = {
      color: "red",
      fontSize: "5px"
    };
    let msgTitle = null;
    let msgUrl = null;
    let sendDisable = true;
    let sendUrlCheck = "ng";
    let sendBtn = null;
    let sendTitleCheck = "ng";
    let maxLength = 20;
    let minLength = 0;
    let titleLength = this.state.title.length;
    let checkUrl = this.state.url.match(
      /^https?(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/
    );

    if (titleLength > maxLength) {
      msgTitle = <p style={displayStyle}>*20文字以内</p>;
      sendTitleCheck = "ng";
    } else if (titleLength <= minLength) {
      msgTitle = <p style={displayStyle}>*必須</p>;
      sendTitleCheck = "ng";
    } else {
      msgTitle = <p></p>;
      sendTitleCheck = "ok";
    }

    if (this.state.url === "") {
      msgUrl = <p style={displayStyle}>*必須</p>;
      sendUrlCheck = "ng";
    } else if (checkUrl !== null) {
      msgUrl = <p></p>;
      sendUrlCheck = "ok";
    } else {
      msgUrl = <p style={displayStyle}>リンクを貼ってください</p>;
      sendUrlCheck = "ng";
    }

    if (
      this.state.title &&
      this.state.url &&
      sendTitleCheck === "ok" &&
      sendUrlCheck === "ok"
    ) {
      sendDisable = false;
    } else {
      sendDisable = true;
    }

    sendBtn = (
      <button id="formBtn" onClick={e => this.post()} disabled={sendDisable}>
        {" "}
        送信
      </button>
    );

    return (
      <>
        <Link to="/" style={styles.Link}>
          キャンセル
        </Link>
        <label>
          見出し
          <br />
          {msgTitle}
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
          {msgUrl}
          <input
            type="text"
            value={this.state.url}
            name="url"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        {sendBtn}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { isFetching: state.linkCards.isFetching };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addLinkCard }, dispatch);
};

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostCard)
);
