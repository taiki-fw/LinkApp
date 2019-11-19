import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { changePage } from "../reducer/modules/pagination";

const PaginationBtn = props => {
  const PagenationBtn = [];
  for (let i = 1; i <= Math.ceil(props.data_num / props.itemPerPage); i++) {
    PagenationBtn.push(i);
  }
  const RenderPaginationBtn = PagenationBtn.map(n => (
    <PageLi key={n} id={n} onClick={e => props.changePage(e.target.id)}>
      {n}
    </PageLi>
  ));
  return <PageUl>{RenderPaginationBtn}</PageUl>;
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

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBtn);

const PageLi = styled.li`
  display: inline-block;
  padding: 0.25em 0.5em;
  margin: 0.1em;
  border: 1px solid #0d3f67;
  color: #0d3f67;
  :hover {
    color: white;
    cursor: pointer;
    background-color: #0d3f67;
  }
`;

const PageUl = styled.ul`
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
