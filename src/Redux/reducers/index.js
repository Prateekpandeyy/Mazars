import {combineReducers} from "redux";
import {LoginReducer} from "../reducers/loginReducer";
const createRootReducer =(history)=> 
combineReducers({
    LoginReducer,
})

export default createRootReducer;