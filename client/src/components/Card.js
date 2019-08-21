import React from "react";

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

  handleClick() {}

  render() {
    return (
      <>
        {this.state.completed ? (
          <li>
            <a href={this.state.url}>
              <h3>{this.state.title}</h3>
              <p>{this.state.comment}</p>
            </a>
            <button>編集</button>
          </li>
        ) : (
          <li>
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
            <button>完了</button>
          </li>
        )}
      </>
    );
  }
}

export default Card;
