import {combineReducers} from "redux";
import leads from './leads'
import alert from './alert'
import auth from './auth'

export default combineReducers({
    leads,
    alert,
    auth,
})