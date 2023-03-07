import { combineReducers } from "redux";
import logincheck from "./logincheck";
import special from "./special";
import reserve from './reserve';

const rootReducer = combineReducers({ special, logincheck, reserve });
export default rootReducer;