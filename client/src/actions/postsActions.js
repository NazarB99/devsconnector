import axios from 'axios';
import {ADD_POST, POST_LOADING, GET_ERRORS, GET_POSTS} from "./types";

export const addPost = postData => dispatch => {
    axios.post('/api/posts', postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

export const getPosts = () => dispatch => {
    dispatch(postLoading());
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

export const postLoading = () => dispatch => {
  dispatch({
      type:POST_LOADING
  })
};