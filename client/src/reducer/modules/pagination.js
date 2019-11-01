let initialState = {
  currentPage: 1,
  itemPerPage: 10,
  lastItem: currentPage * itemPerPage,
  firstItem: lastItem - itemPerPage
};

const CHANGE_PAGE = "CHANGE_PAGE";

export function changePage(page_num) {
  return {
    type: CHANGE_PAGE,
    page_num
  };
}

export default function pagination(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page_num
      });
    default:
      return state;
  }
}
