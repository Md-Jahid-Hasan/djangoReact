import {ADD_ALERT, DELETE_ALERT, ERROR_ALERT} from "../actions/types";

const initialState = {
    msg: [],
    status: null,
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_ALERT:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        case ADD_ALERT:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        case ERROR_ALERT:
            return {
                error: action.payload.error,
                status: action.payload.status,
            }
        default:
            return state

    }
}