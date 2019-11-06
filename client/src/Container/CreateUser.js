import React from "react";
import { Link, withRouter } from "react-router-dom";
import request from "superagent";

import Input from "../Functional/Input";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errMsg: ""
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

  formSubmit(e) {
    e.preventDefault();
    this.userRegistrations();
  }

  userRegistrations() {
    request
      .post("/api/user/registration")
      .send({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) {
          window.alert(err);
          return;
        }
        if (res.body.result) {
          this.setState({ errMsg: "登録に成功しました" });
        } else {
          this.setState({ errMsg: "登録に失敗しました" });
        }
        this.props.history.push("/user/login");
      });
  }

  render() {
    const errMsg = this.state.errMsg ? (
      <span style={styles.err}>{this.state.errMsg}</span>
    ) : (
      ""
    );
    return (
      <>
        <h1>Welcome</h1>
        <form onSubmit={e => this.formSubmit(e)}>
          <Input
            inputName="名前"
            type="text"
            name="name"
            value={this.state.name}
            handleChange={this.handleChange}
          />
          <Input
            inputName="メールアドレス"
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <Input
            inputName="パスワード"
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <input type="submit" value="登録" />
        </form>
        <p>
          アカウントをお持ちの場合
          <Link to="/user/login">ログイン</Link>
        </p>
      </>
    );
  }
}

const styles = {
  err: {
    color: "red"
  }
};

export default withRouter(CreateUser);
