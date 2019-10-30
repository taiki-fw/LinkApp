import request from "superagent";

let initialState = {
  isFetching: false,
  data: []
};

// action types
const GET_LINK = "GET_LINK";
const POST_LINK = "POST_LINK";
const EDIT_LINK = "EDIT_LINK";
const DELETE_LINK = "DELETE_LINK";

function getLinkCard() {
  return {
    type: GET_LINK
  };
}

function postLinkCardSuccess(linkData) {
  return {
    type: POST_LINK,
    linkData
  };
}

function editLinkCard(linkData) {
  return {
    type: EDIT_LINK,
    linkData
  };
}

function addLinkCard(linkDataId) {
  return {
    type: DELETE_LINK,
    linkDataId
  };
}

export default function linkCards(state = initialState, action) {
  switch (action.type) {
    case POST_LINK:
      return Object.assign({}, state, {
        isFetching: false,
        data: [...state.data, action.linkData]
      });
    case GET_LINK:
      return Object.assign({}, state, {
        isFetching: true,
        data: []
      });
  }
}

export function addFetchLinkCard(linkData) {
  return function(dispatch) {
    dispatch(postLinkCardSuccess());
    return request
      .post("/api/createLink")
      .send(linkData)
      .end((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        dispatch(postLinkCardSuccess(data));
      });
  };
}
