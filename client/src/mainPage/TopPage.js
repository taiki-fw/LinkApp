import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import request from "superagent";

import { fetchLinkCard } from "../reducer/modules/linkCards";
import PaginationBtn from "../Functional/pagination";
import Card from "../components/Card";

function get_timestamp(_date) {
  var _d = _date ? new Date(_date) : new Date();

  return Math.floor(_d.getTime() / 1000);
}

class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
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
      });

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
    return (
      <>
        <input
          type="text"
          onChange={e => this.search(e)}
          value={this.state.searchWord}
          placeholder="検索"
        />
        <ul style={styles.ul}>{CardList}</ul>
        <PaginationBtn />
      </>
    );
  }
}

const styles = {
  ul: {
    display: "flex",
    flexWrap: "wrap",
    listStyleType: "none"
  }
};

const mapStateToProps = state => {
  const paginationObj = state.pagination;
  const lastItem = paginationObj.currentPage * paginationObj.itemPerPage;
  const firstItem = lastItem - paginationObj.itemPerPage;
  return {
    data: state.linkCards.data.slice(firstItem, lastItem)
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
