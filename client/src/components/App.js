import React from "react";
import { withRouter, Link } from "react-router-dom";
import request from "superagent";
import { H3, H2, RowDiv, PostInput, CenterDiv, PostDiv, Button, RedP } from './style.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: "",
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
    let msgTitle = null
    let msgUrl = null
    let sendDisable = true
    let sendUrlCheck = "ng"
    let sendBtn = null
    let sendTitleCheck = "ng"
    let maxLength = 20
    let minLength = 0
    let titleLength = this.state.title.length
    let checkUrl = this.state.url.match(/^https?(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/)

    if (titleLength > maxLength) {
      msgTitle = <RedP>*20文字以内</RedP>
      sendTitleCheck = "ng"
    } else if (titleLength <= minLength) {
      msgTitle = <RedP>*必須</RedP>
      sendTitleCheck = "ng"
    } else {
      msgTitle = <RedP></RedP>
      sendTitleCheck = "ok"
    }

    // switch(alertTitleType) {
    //   case "long":
    //     msgTitle = <p style={displayStyle}>*20文字以内</p>
    //   case "none":
    //     msgTitle = <p></p>
    //   case "short":
    //     msgTitle = <p style={displayStyle}>*必須</p>
    // }

    if (this.state.url === ""){
      msgUrl = <RedP>*必須</RedP>
      sendUrlCheck = "ng"
    }else if (checkUrl !== null){
      msgUrl = <RedP></RedP>
      sendUrlCheck = "ok"
    }else {
      msgUrl = <RedP>*リンクを貼ってください</RedP>
      sendUrlCheck = "ng"
    }

    // switch(alertUrlType) {
    //   case true:
    //     msgUrl = <p style={displayStyle}>*必須</p>
    //   case false:
    //     msgUrl = <p></p>
    // }

    if (this.state.title && this.state.url && sendTitleCheck === "ok" && sendUrlCheck === "ok") {
      sendDisable = false
    } else {
      sendDisable = true
    }

    sendBtn = < Button id="formBtn" onClick={e => this.post()} disabled={sendDisable} > 送信</Button >
  
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
        <CenterDiv>
        {sendBtn}
        </CenterDiv>
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
    textAlign: "center"
  },

};

export default withRouter(App);
