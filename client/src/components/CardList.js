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

    const limitCard = this.state.items
      .sort((p, n) => -(p.created_at - n.created_at))
      .slice(IndexOfFirstItem, IndexOfLastItem);

    const CardList = limitCard.map(i => (
      <Card
        key={i.id}
        id={i.id}
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
      <li
        key={n}
        id={n}
        onClick={e => this.pageNumClick(e)}
        style={styles.pageBtn}
      >
        {n}
      </li>
    ));

    return (
      <>
        <ul style={styles.ul}>{CardList}</ul>
        <ul style={styles.ul}>{RenderPagenationBtn}</ul>
      </>
    );
  }
}

const styles = {
  ul: {
    display: "flex",
    flexWrap: "wrap",
    listStyleType: "none"
  },
  pageBtn: {
    padding: "0.25em 0.5em",
    margin: "0.1em",
    border: "1px solid blue",
    color: "blue"
  }
};
