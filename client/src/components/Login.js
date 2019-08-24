import React from "react";
import request from "superagent";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleChange(e) {
    const newValue = e.target.value;
    const key = e.target.name;
    this.setState({
      [key]: newValue
    });
  }

  login() {}

  render() {
    return (
      <>
        <h1>Welcome Home</h1>
        <form>
          <label>
            メールアドレス
            <br />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
            />
            <br />
          </label>
          <label>
            パスワード
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
            <br />
          </label>
          <input type="submit" value="Login" />
        </form>
      </>
    );
  }
}
