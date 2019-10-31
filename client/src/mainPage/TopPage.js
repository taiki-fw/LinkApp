import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import request from "superagent";

import { fetchLinkCard } from "../reducer/modules/linkCards";
import Card from "../components/Card";

function get_timestamp(_date) {
  var _d = _date ? new Date(_date) : new Date();

  return Math.floor(_d.getTime() / 1000);
}

class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.props.fetchLinkCard();
      }
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

    const limitCard = this.props.data
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
      .sort((p, n) => {
        return -(get_timestamp(p.created_at) - get_timestamp(n.created_at));
      })
      .slice(IndexOfFirstItem, IndexOfLastItem);

    const CardList = limitCard.map(i => (
      <Card
        key={i.id}
        id={i.id}
        title={i.title}
        comment={i.comment}
        url={i.url}
        getLinkData={() => this.props.fetchLinkCard()}
      />
    ));

    const PagenationBtn = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.data.length / this.state.itemPerPage);
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

const mapStateToProps = state => {
  return {
    data: state.linkCards.data
  };
};

const mapToDispatchProps = dispatch => {
  return bindActionCreators({ fetchLinkCard }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapToDispatchProps
  )(TopPage)
);
