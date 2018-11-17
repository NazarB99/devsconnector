import {SET_CURRENT_PROFILE, SET_PROFILE_LOADING} from "../actions/types";
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