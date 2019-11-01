import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changePage } from "../reducer/modules/pagination";

const PaginationBtn = props => {
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
  const PagenationBtn = [];
  for (let i = 1; i <= Math.ceil(props.data_num / props.itemPerPage); i++) {
    PagenationBtn.push(i);
  }
  const RenderPaginationBtn = PagenationBtn.map(n => (
    <li
      key={n}
      id={n}
      onClick={e => props.changePage(e.target.id)}
      style={styles.pageBtn}
    >
      {n}
    </li>
  ));
  return <ul style={styles.ul}>{RenderPaginationBtn}</ul>;
};

const mapStateToProps = state => {
  return {
    data_num: state.linkCards.data.length,
    itemPerPage: state.pagination.itemPerPage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ changePage }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationBtn);
