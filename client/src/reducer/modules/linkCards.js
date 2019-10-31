import request from "superagent";

let initialState = {
  msg: "",
  isFetching: false,
  data: []
};

// action types
const REQUEST_FETCH = "REQUEST_FETCH";
const RECEIVE_FETCH = "RECEIVE_FETCH";
const POST_LINK = "POST_LINK";
const EDIT_LINK = "EDIT_LINK";
const DELETE_LINK = "DELETE_LINK";

function requestFetch() {
  return {
    type: REQUEST_FETCH
  };
}

function recieveFetch(linkData) {
  return {
    type: RECEIVE_FETCH,
    linkData
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

function deleteLinkCard(msg) {
  return {
    type: DELETE_LINK,
    msg
  };
}

export default function linkCards(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        data: [...state.data]
      });
    case RECEIVE_FETCH:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.linkData
      });
    case POST_LINK:
      return Object.assign({}, state, {
        data: [action.linkData]
      });
    case DELETE_LINK:
      return Object.assign({}, state, {
        msg: action.msg
      });
    default:
      return state;
  }
}

export function fetchLinkCard() {
  return function(dispatch) {
    dispatch(requestFetch());
    request.get("/api/getItems").end((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      dispatch(recieveFetch(data.body.logs));
    });
  };
}

export function addLinkCard(linkData) {
  return function(dispatch) {
    request
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

export function asyncDeleteLinkCard(linkCard_id) {
  return function(dispatch) {
    request
      .delete("/api/deleteItem")
      .send({
        id: linkCard_id
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        dispatch(deleteLinkCard(res.body.msg));
      });
  };
}
