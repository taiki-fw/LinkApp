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
      [e.target.name]: e.target.value
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

const styles = {
  li: {
    display: "flex",
    alignItems: "center"
  },
  a: {
    textDecoration: "none",
    color: "black",
    display: "flex"
  },
  button: {
    cursor: "pointer"
  }
};

export default Card;
