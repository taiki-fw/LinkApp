import React from "react";
import request from "superagent";

class App extends React.Component {
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
      .get("/link")
      .query({
        title: this.state.title,
        comment: this.state.comment,
        url: this.state.comment
      })
      .end((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      });
  }

  render() {
    return (
      <>
        <label>
          見出し
          <br />
          <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          コメント
          <br />
          <input
            type="text"
            value={this.state.comment}
            name="comment"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          URL
          <br />
          <input
            type="text"
            value={this.state.url}
            name="url"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <button onClick={e => this.post()}>送信</button>
      </>
    );
  }
}

export default App;
