import React from "react";
import request from "superagent";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
        console.log(res);
      });
  }

  render() {
    return (
      <>
        <h1>Welcome</h1>
        <form onSubmit={e => this.formSubmit(e)}>
          <label>
            名前
            <br />
            <input
              type="text"
              name="name"
              onChange={e => this.handleChange(e)}
            />
            <br />
          </label>
          <label>
            メールアドレス
            <br />
            <input
              type="email"
              name="email"
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
              onChange={e => this.handleChange(e)}
            />
            <br />
          </label>
          <input type="submit" value="登録" />
        </form>
      </>
    );
  }
}
