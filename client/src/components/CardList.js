import React from "react";
import request from "superagent";

import Card from "./Card";

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    request.get("/api/getItems").end((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({ items: data.body.logs });
    });
  }

  render() {
    const CardList = this.state.items.map(i => (
      <Card key={i._id} title={i.title} comment={i.comment} url={i.url} />
    ));
    return <ul>{CardList}</ul>;
  }
}
