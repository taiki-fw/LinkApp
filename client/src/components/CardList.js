import React from "react";
import request from "superagent";
import Card from "./Card";
import { CardUl, PageUl, PageLi } from './style.js';

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

    const limitCard = this.state.items
      .sort((p, n) => -(p.createTime - n.createTime))
      .slice(IndexOfFirstItem, IndexOfLastItem);

    const CardList = limitCard.map(i => (
      <Card
        key={i._id}
        id={i._id}
        title={i.title}
        comment={i.comment}
        url={i.url}
        getLinkData={() => this.getLinkData()}
      />
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
      <PageLi
        key={n}
        id={n}
        onClick={e => this.pageNumClick(e)}
      >
        {n}
      </PageLi>
    ));

    return (
      <>
        <CardUl>{CardList}</CardUl>
        <PageUl>{RenderPagenationBtn}</PageUl>
      </>
    );
  }
}


