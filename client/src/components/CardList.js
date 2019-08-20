import React from "react";
import request from "superagent";

import Card from "./Card";

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      itemPerPage: 12
    };
  }

  componentWillMount() {
    this.getLinkData();
  }

  getLinkData() {
    request.get("/api/getItems").end((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({ items: data.body.logs });
    });
  }

  itemsSort(items) {
    if (typeof items !== "object") {
      console.error("リンクが配列でAPIから取得出来ていません");
      return;
    }
  }

  render() {
    const IndexOfLastItem = this.state.currentPage * this.state.itemPerPage;
    const IndexOfFirstItem = IndexOfLastItem - this.state.itemPerPage;

    const limitCard = this.state.items.slice(IndexOfFirstItem, IndexOfLastItem);

    const CardList = limitCard.map(i => (
      <Card key={i._id} title={i.title} comment={i.comment} url={i.url} />
    ));

    return (
      <>
        <div>
          <button onClick={() => this.getLinkData()}>再読み込み</button>
        </div>
        <ul>{CardList}</ul>
      </>
    );
  }
}
