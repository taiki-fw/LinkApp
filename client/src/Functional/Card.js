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
        <EditBtn
          onClick={() => {
            this.handleClick();
            this.props.getLinkData();
          }}
        >
          {actionText}
        </EditBtn>
      </>
    );
    return (
      <>
        {this.state.completed ? (
          <Li>
            <a
              href={this.state.url}
              style={styles.a}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="card__title">{this.state.title}</h3>
              <p className="card__comment">{this.state.comment}</p>
            </a>
            {actionBtn}
            <DeleteBtn
              onClick={() => {
                this.props.asyncDeleteLinkCard(this.props.id);
              }}
            >
              削除
            </DeleteBtn>
          </Li>
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
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { asyncEditLinkCard, asyncDeleteLinkCard },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Card);

const Btn = styled.button`
  position: absolute;
  z-index: 2;
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

const EditBtn = styled(Btn)`
  left: 0;
`;

const DeleteBtn = styled(Btn)`
  right: 0;
`;

export const Li = styled.li`
  position: relative;
  width: 200px;
  height: 300px;
  box-shadow: 4px 4px 4px #999;
  margin: 20px 30px;
  padding: 1em;
  transition: 0.2s;
  background-color: white;
  display: inline-block;
  :hover {
    box-shadow: 8px 8px 8px #999;
    cursor: pointer;
  }
  @media (max-width: 1040px) {
    margin: 10px 20px;
  }
  @media (max-width: 700px) {
    width: 100px;
    height: 150px;
    margin: 10px 10px;
    padding: 5px;
  }
  a {
    display: block;
    text-decoration: none;
    height: 100%;
  }
  .card__title {
    color: #0d3f67;
    text-align: center;
    @media (max-width: 700px) {
      font-size: 12px;
      margin: 5px;
    }
  }
  .card__comment {
    text-align: left;
    color: black;
    @media (max-width: 700px) {
      font-size: 10px;
    }
  }
`;
