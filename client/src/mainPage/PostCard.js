import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import { FromName, PostWrapper, CenterDiv } from "../components/style.js";

import Input from "../Functional/Input";
import SubmitBtn from "../Functional/Submit";

import { addLinkCard } from "../reducer/modules/linkCards";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: "",
      errorMessage: {
        title: "",
        url: ""
      },
      isDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.post = this.post.bind(this);
  }

  checkTitle(value) {
    const maxLength = 20;
    if (value.length > maxLength) {
      return `20文字以内にしてください。(現在${value.length}文字))`;
    } else if (value.length <= 0) {
      return `必須項目に必ずご記入ください`;
    }
  }

  checkUrl(value) {
    const regex = new RegExp(
      /^https?(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/
    );

    if (value.length <= 0) {
      return `必須項目に必ずご記入ください`;
    } else if (!regex.test(this.state.url)) {
      return "リンクを貼ってください";
    }
  }

  handleChange(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    const errorMessage = {
      title: "",
      url: ""
    };
    switch (name) {
      case "title":
        errorMessage["title"] = this.checkTitle(newValue);
        break;
      case "url":
        errorMessage["url"] = this.checkUrl(newValue);
        break;
    }
    this.setState({
      [name]: newValue,
      errorMessage: errorMessage
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
    let sendDisable = true;
    if (!(this.state.errorMessage.title && this.state.errorMessage.url)) {
      sendDisable = true;
    } else {
      sendDisable = false;
    }

    return (
      <>
        <PostWrapper>
          <FromName>新規投稿</FromName>
          <Input
            inputName="見出し"
            need={true}
            type="text"
            value={this.state.title}
            name="title"
            handleChange={this.handleChange}
            errMsg={this.state.errorMessage.title}
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
            need={true}
            type="text"
            value={this.state.url}
            name="url"
            handleChange={this.handleChange}
            errMsg={this.state.errorMessage.url}
          />
          <br />
          <CenterDiv>
            <SubmitBtn handleSubmit={this.post} isDisabled={sendDisable} />
          </CenterDiv>
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
