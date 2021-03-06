import {
    SET_CURRENT_PROFILE,
    GET_PROFILES,
    SET_PROFILE_LOADING,
    CLEAR_PROFILE_DATA,
    GET_ERRORS,
    SET_CURRENT_USER
} from "../actions/types";
import axios from 'axios';

export const setCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: {}
            });
        })

};

export const setProfileLoading = () => {
    return {
        type: SET_PROFILE_LOADING
    }
};

export const createProfile = (newProfile,history) => dispatch => {
    axios.post('/api/profile',newProfile)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
};

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
        .then(res => dispatch({
            type:SET_CURRENT_PROFILE,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
};

export const addExperience = (expData,history) => dispatch => {
  axios.post('/api/profile/experience',expData)
      .then(res => history.push('/dashboard'))
      .catch(err => dispatch({
          type:GET_ERRORS,
          payload:err.response.data
      }))
};

export const addEducation = (eduData,history) => dispatch => {
    axios.post('/api/profile/education',eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
      .then(res => dispatch({
          type:GET_PROFILES,
          payload:res.data
      }))
      .catch(err => dispatch({
          type:GET_PROFILES,
          payload:null
      }))
};

export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
      .then(res => dispatch({
          type:SET_CURRENT_PROFILE,
          payload:res.data
      }))
      .catch(err => dispatch({
          type:GET_ERRORS,
          payload:err.response.data
      }))
};

export const deleteEducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`)
        .then(res => dispatch({
            type:SET_CURRENT_PROFILE,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
};

export const deleteAccount = () => dispatch =>{
  if (window.confirm('Are you sure? This action CAN NOT be undone')){
      axios.delete('/api/profile/delete')
          .then(res => dispatch({
              type:SET_CURRENT_USER,
              payload:{}
          }))
          .catch(err => dispatch({
              type:GET_ERRORS,
              payload:err.response.data
          }))
  }
};

export const clearProfileData = () => {
    return {
        type: CLEAR_PROFILE_DATA
    }
};