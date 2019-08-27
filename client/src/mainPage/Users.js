import React from "react";
import request from "superagent";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    request.get("/api/users").end((err, data) => {
      this.setState({ users: data.body.logs });
    });
  }

  render() {
    const userList = this.state.users.map(u => <li key={u._id}>{u.name}</li>);
    return <ul>{userList}</ul>;
  }
}
