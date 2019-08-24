import React from "react";
import { withRouter } from "react-router-dom";
import request from "superagent";

class CreateUser extends React.Component {
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
        if (res.body.msg.errorType === "uniqueViolated") {
          window.alert("このメールアドレスは既に使用されています");
          return;
        }
        console.log(res);
        this.props.history.push("/user/login");
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
              value={this.state.name}
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
          <input type="submit" value="登録" />
        </form>
      </>
    );
  }
}

export default withRouter(CreateUser);
