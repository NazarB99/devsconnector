import axios from 'axios';
import {ADD_POST, POST_LOADING, GET_ERRORS, GET_POSTS, DELETE_POST, GET_POST, ADD_COMMENT} from "./types";

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

export const getPost = (id) => dispatch => {
    dispatch(postLoading());
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

export const postLoading = () => dispatch => {
    dispatch({
        type: POST_LOADING
    })
};

export const deletePost = (postId) => dispatch => {
    axios.delete(`/api/posts/${postId}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: postId
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
};

export const addComment = (newComment,postId) => dispatch =>{
    axios.post(`/api/posts/comment/${postId}`,newComment)
        .then(res => dispatch({
            type:ADD_COMMENT,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
};