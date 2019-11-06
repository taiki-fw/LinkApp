import React from "react";
import { Link } from "react-router-dom";
import request from "superagent";

import Input from "../Functional/Input";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const newValue = e.target.value;
    const key = e.target.name;
    this.setState({
      [key]: newValue
    });
  }

  Submit(e) {
    e.preventDefault();
    this.login();
  }

  login() {
    request
      .post("/api/user/login")
      .send({
        email: this.state.email,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        if (res) {
          window.alert(res.body.msg);
          this.props.history.push("/");
        }
      });
  }

  render() {
    return (
      <>
        <h1>Welcome Home</h1>
        <form onSubmit={e => this.Submit(e)}>
          <Input
            inputName="メールアドレス"
            need={false}
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <Input
            inputName="パスワード"
            need={false}
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <input type="submit" value="Login" />
        </form>
        <p>
          アカウントをお持ちでない方はこちら>>
          <Link to="/user/registrations">アカウント作成</Link>
        </p>
      </>
    );
  }
}
