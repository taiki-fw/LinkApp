import React from "react";
import { withRouter } from "react-router-dom";
import request from "superagent";

import Card from "../components/Card";

class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      itemPerPage: 12,
      searchWord: ""
    };
  }

  componentDidMount() {
    request.get("/api/user/auth").end((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!data.body.auth) {
        this.props.history.push("/user/login");
      } else {
        this.getLinkData();
      }
    });
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

  search(e) {
    const word = e.target.value;
    this.setState({ searchWord: word });
  }

  pageNumClick(e) {
    const pageNum = e.target.id;
    this.setState({ currentPage: pageNum });
  }

  render() {
    const IndexOfLastItem = this.state.currentPage * this.state.itemPerPage;
    const IndexOfFirstItem = IndexOfLastItem - this.state.itemPerPage;

    const limitCard = this.state.items
      .filter(i => {
        const word = this.state.searchWord;
        if (!word) {
          return true;
        } else {
          let title = i.title.match(word);
          let comment = i.comment.match(word);
          if (title || comment) {
            return true;
          } else {
            return false;
          }
        }
      })
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
        <input
          type="text"
          onChange={e => this.search(e)}
          value={this.state.searchWord}
          placeholder="検索"
        />
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

export default withRouter(TopPage);
