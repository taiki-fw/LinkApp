import React from "react";
import { withRouter, Link } from "react-router-dom";
import request from "superagent";
import {
  H3,
  H2,
  RowDiv,
  PostInput,
  CenterDiv,
  PostDiv,
  Button
} from "../components/style.js";

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
    request
      .post("/api/createLink")
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

    // switch(alertTitleType) {
    //   case "long":
    //     msgTitle = <p style={displayStyle}>*20文字以内</p>
    //   case "none":
    //     msgTitle = <p></p>
    //   case "short":
    //     msgTitle = <p style={displayStyle}>*必須</p>
    // }

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

    // switch(alertUrlType) {
    //   case true:
    //     msgUrl = <p style={displayStyle}>*必須</p>
    //   case false:
    //     msgUrl = <p></p>
    // }

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
        <PostDiv>
          <label>
            <H2>新規投稿</H2>
            <CenterDiv>
              <RowDiv>
                <H3>見出し</H3>
                {msgTitle}
              </RowDiv>
              <PostInput
                type="text"
                value={this.state.title}
                name="title"
                onChange={e => this.handleChange(e)}
              />
            </CenterDiv>
          </label>
          <br />
          <label>
            <RowDiv>
              <H3>コメント</H3>
            </RowDiv>
            <CenterDiv>
              <PostInput
                type="text"
                value={this.state.comment}
                name="comment"
                onChange={e => this.handleChange(e)}
              />
            </CenterDiv>
          </label>
          <br />
          <label>
            <RowDiv>
              <H3>URL</H3>
              {msgUrl}
            </RowDiv>
            <CenterDiv>
              <PostInput
                type="text"
                value={this.state.url}
                name="url"
                onChange={e => this.handleChange(e)}
              />
            </CenterDiv>
          </label>
          <br />
          <CenterDiv>{sendBtn}</CenterDiv>
        </PostDiv>
        <Link to="/" style={styles.Link}>
          キャンセル
        </Link>
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
    padding: "0.5em 1.5em 0.5em 0",
    textAlign: "center"
  }
};

export default withRouter(PostCard);
