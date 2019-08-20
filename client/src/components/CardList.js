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

  pageNumClick(e) {
    const pageNum = e.target.id;
    this.setState({ currentPage: pageNum });
  }

  render() {
    const IndexOfLastItem = this.state.currentPage * this.state.itemPerPage;
    const IndexOfFirstItem = IndexOfLastItem - this.state.itemPerPage;

    const limitCard = this.state.items.slice(IndexOfFirstItem, IndexOfLastItem);

    const CardList = limitCard.map(i => (
      <Card key={i._id} title={i.title} comment={i.comment} url={i.url} />
    ));

    const PagenationBtn = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.items.length / this.state.itemPerPage);
      i++
    ) {
      PagenationBtn.push(i);
    }
    const RenderPagenationBtn = PagenationBtn.map(n => (
      <li key={n} id={n} onClick={e => this.pageNumClick(e)}>
        {n}
      </li>
    ));

    return (
      <>
        <div>
          <button onClick={() => this.getLinkData()}>再読み込み</button>
        </div>
        <ul>{CardList}</ul>
        <ul>{RenderPagenationBtn}</ul>
      </>
    );
  }
}
