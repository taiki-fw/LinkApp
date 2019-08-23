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
      this.props.getLinkData();
    }
  }

  render() {
    const actionText = this.state.completed ? "編集" : "完了";
    const actionBtn = (
      <button style={styles.button} onClick={() => this.handleClick()}>
        {actionText}
      </button>
    );
    return (
      <>
        {this.state.completed ? (
          <li style={styles.li}>
            <a href={this.state.url} style={styles.a}>
              <h3>{this.state.title}</h3>
              <p>{this.state.comment}</p>
              {actionBtn}
            </a>
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
    backgroundColor: "#EDF0F2",
    padding: "1em",
    margin: "0.5em",
    width: "25%"
  },
  a: {
    position: "relative",
    zIndex: "1",
    display: "block",
    textDecoration: "none",
    color: "#0D3F67"
  },
  button: {
    position: "absolute",
    zIndex: "2",
    right: "0",
    top: "0"
  }
};

export default Card;
