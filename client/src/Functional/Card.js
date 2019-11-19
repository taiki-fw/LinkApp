import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  asyncEditLinkCard,
  asyncDeleteLinkCard
} from "../reducer/modules/linkCards";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      comment: this.props.comment,
      url: this.props.url,
      completed: true
    };
  }

  handleChange(e) {
    const newValue = e.target.value;
    this.setState({
      [e.target.name]: newValue
    });
  }

  handleClick() {
    if (this.state.completed) {
      this.setState({ completed: !this.state.completed });
    } else if (!this.state.completed) {
      this.props.asyncEditLinkCard({
        id: this.props.id,
        title: this.state.title,
        comment: this.state.comment,
        url: this.state.url
      });
      this.setState({ completed: !this.state.completed });
    }
  }

  render() {
    const actionText = this.state.completed ? "編集" : "完了";
    const actionBtn = (
      <>
        <EditButton
          onClick={() => {
            this.handleClick();
            this.props.getLinkData();
          }}
        >
          {actionText}
        </EditButton>
      </>
    );
    return (
      <>
        {this.state.completed ? (
          <li style={styles.li}>
            <a href={this.state.url} style={styles.a} target="_blank">
              <h3>{this.state.title}</h3>
              <p>{this.state.comment}</p>
            </a>
            {actionBtn}
            <button
              style={styles.buttonD}
              onClick={() => {
                this.props.asyncDeleteLinkCard(this.props.id);
              }}
            >
              削除
            </button>
          </li>
        ) : (
          <li style={styles.li}>
            <input
              type="text"
              value={this.state.title}
              name="title"
              onChange={e => this.handleChange(e)}
            />
            <input
              type="text"
              value={this.state.comment}
              name="comment"
              onChange={e => this.handleChange(e)}
            />
            <input
              type="text"
              value={this.state.url}
              name="url"
              onChange={e => this.handleChange(e)}
            />
            {actionBtn}
          </li>
        )}
      </>
    );
  }
}

// とりあえずのスタイル
const styles = {
  li: {
    position: "relative",
    zIndex: "1",
    backgroundColor: "#EDF0F2",
    padding: "1em",
    margin: "0.5em",
    width: "25%"
  },
  a: {
    display: "block",
    textDecoration: "none",
    color: "#0D3F67"
  },
  button: {
    position: "absolute",
    zIndex: "2",
    left: "0",
    bottom: "-2em",
    border: "none",
    padding: 0,
    color: "#0D3F67"
  },
  buttonD: {
    position: "absolute",
    zIndex: "2",
    right: "0",
    bottom: "-2em",
    border: "none",
    padding: 0,
    color: "#0D3F67"
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { asyncEditLinkCard, asyncDeleteLinkCard },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Card);

const EditButton = styled.button`
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 5px;
  border-style: none;
  border: 1px solid black;

  :hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
  @media (max-width: 700px) {
    font-size: 10px;
  }
`;
