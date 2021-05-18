import axios from 'axios';

import {GET_LEADS, DELETE_LEAD, ADD_LEAD, ADD_ALERT, DELETE_ALERT, ERROR_ALERT} from "./types";
import {getHeader} from "./auth";
import Cookies from "js-cookie";

export const getLeads = () => (dispatch, getState) => {
    const token = getState().auth.token
    console.log(token)
    //Header of request
    const csrftoken = Cookies.get('csrftoken');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            //'X-CSRFToken': csrftoken
        }
    }

    //IF token exists the add to the header
    if (token){
        config.headers['Authorization'] = `Token ${token}`
    }
    axios
        .get('/api/leads/', config)
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        }).catch( err=> console.log(err))
}

export const deleteLead = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/leads/${id}`, getHeader(getState))
        .then(res => {
            const error = {
                msg: "Delete successfully",
                status: 200
            }
            dispatch({
                    type: DELETE_ALERT,
                    payload:error
            })
            dispatch({
                type: DELETE_LEAD,
                payload: id
            })
        }).catch( err=> console.log(err))
}

export const addLeads = (lead) => (dispatch, getState) => {
    axios
        .post('/api/leads/', lead, getHeader(getState))
        .then(res => {
            const alert = {
                msg: "Successfully Add",
                status: 200
            }
            dispatch({
                type: ADD_ALERT,
                payload: alert
            })
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            })
        }).catch( err=> {
            const error = {
                status: err.response.status,
                error: err.response.data
            }
            dispatch({
                type: ERROR_ALERT,
                payload: error,
            })
    })
}