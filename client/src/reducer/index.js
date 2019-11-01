import { combineReducers } from "redux";
import linkCards from "./modules/linkCards";
import pagination from "./modules/pagination";

const reducers = combineReducers({ linkCards, pagination });

export default reducers;
