import React from "react";
import request from "superagent";
import { Li, CardH3, CardP, EditButton } from './style.js';

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
      request
        .put("/api/editItem")
        .send({
          id: this.props.id,
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
      this.setState({ completed: !this.state.completed });
      this.props.getLinkData();
    }
  }

  render() {
    const actionText = this.state.completed ? "編集" : "完了";
    const actionBtn = (
      <EditButton onClick={() => this.handleClick()}>
        {actionText}
      </EditButton>
    );
    return (
      <>
        {this.state.completed ? (
          <Li style={styles.li}>
            <a href={this.state.url} style={styles.a}>
              <CardH3>{this.state.title}</CardH3>
              <CardP>{this.state.comment}</CardP>
              {actionBtn}
            </a>
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
  a: {
    position: "relative",
    zIndex: "1",
    display: "block",
    textDecoration: "none",
    color: "#0D3F67",
    height: "100%",
    width: "100%",
  }
};

export default Card;
