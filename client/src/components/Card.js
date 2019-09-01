import React from "react";
import request from "superagent";

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
    }
  }

  render() {
    const actionText = this.state.completed ? "編集" : "完了";
    const actionBtn = (
      <button
        style={styles.button}
        onClick={() => {
          this.handleClick();
          this.props.getLinkData();
        }}
      >
        {actionText}
      </button>
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
    // backgroundColor: "transparent"
  }
};

export default Card;
