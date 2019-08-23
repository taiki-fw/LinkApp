import React from "react";

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

  render() {
    return (
      <>
        <h1>Welcome</h1>
        <input type="text" name="name" onChange={e => this.handleChange(e)} />
        <input type="email" name="email" onChange={e => this.handleChange(e)} />
        <input
          type="password"
          name="password"
          onChange={e => this.handleChange(e)}
        />
      </>
    );
  }
}
