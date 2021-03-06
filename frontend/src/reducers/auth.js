import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = initialState, action){
    switch (action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true
            }

        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}