import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import {
  FromName,
  PostWrapper,
  CenterDiv,
  PostDiv,
  Button
} from "../components/style.js";

import Input from "../Functional/Input";

import { addLinkCard } from "../reducer/modules/linkCards";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: ""
    };
    this.handleChange = this.handleChange.bind(this);
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
      <Button id="formBtn" onClick={e => this.post()} disabled={sendDisable}>
        {" "}
        送信
      </Button>
    );

    return (
      <>
        <PostWrapper>
          <FromName>新規投稿</FromName>
          <Input
            inputName="見出し"
            type="text"
            value={this.state.title}
            name="title"
            handleChange={this.handleChange}
            errMsg={msgTitle}
          />
          <br />
          <Input
            inputName="コメント"
            type="text"
            value={this.state.comment}
            name="comment"
            handleChange={this.handleChange}
          />
          <br />
          <Input
            inputName="URL"
            type="text"
            value={this.state.url}
            name="url"
            handleChange={this.handleChange}
            errMsg={msgUrl}
          />
          <br />
          <CenterDiv>{sendBtn}</CenterDiv>
        </PostWrapper>
        <Link to="/" style={styles.Link}>
          キャンセル
        </Link>
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
    padding: "0.5em 1.5em 0.5em 0",
    textAlign: "center"
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostCard)
);
