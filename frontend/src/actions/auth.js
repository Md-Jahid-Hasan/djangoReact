import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    ADD_ALERT,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS, REGISTER_SUCCESS,
} from "./types";
import axios from "axios";
import Cookies from 'js-cookie'

export const loadUser = () =>(dispatch, getState) => {
    // Make user Loading
    dispatch({type: USER_LOADING})

    //Call api for check
    axios
        .get("api/user/me", getHeader(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            const alert = {
                msg: "Please Login to view leads",
                status: 401
            }
            dispatch({
                type: ADD_ALERT,
                payload: alert
            })
            dispatch({
                type:AUTH_ERROR
            })
    })
}

export const login = (username, password) =>(dispatch) => {
    const csrftoken = Cookies.get('csrftoken');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }
    const body = JSON.stringify({username, password})

    //Call api for check
    axios
        .post("/api/user/token/",body, config)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            const alert = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: ADD_ALERT,
                payload: alert
            })
            dispatch({
                type:LOGIN_ERROR
            })
    })
}

export const logout = () =>(dispatch, getState) => {
    //Call api for check
    axios
        .get("/api/user/logout/", getHeader(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            const alert = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: ADD_ALERT,
                payload: alert
            })
    })
}

export const register = ({username, email, password}) =>(dispatch, getState) => {
    const body = JSON.stringify({username, email, password})
    //Call api for check
    axios
        .post("/api/user/create/",body, getHeader(getState))
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            console.log(res.data)
        }).catch(err => {
            const alert = {
                msg: err.response.data,
                status: err.response.status
            }
            // dispatch({
            //     type: ADD_ALERT,
            //     payload: alert
            // })
        console.log(alert)
    })
}

export const getHeader = (getState) => {
    //Get Token from state
    const token = getState().auth.token
    console.log(token)
    //Header of request
    const csrftoken = Cookies.get('csrftoken');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }

    //IF token exists the add to the header
    if (token){
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}