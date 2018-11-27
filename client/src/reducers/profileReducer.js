import {SET_CURRENT_PROFILE, SET_PROFILE_LOADING, CLEAR_PROFILE_DATA, GET_PROFILES, GET_PROFILE_REPOS} from "../actions/types";

const initialState = {
    profile: null,
    profiles: null,
    repos:[],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_LOADING :
            return {
                ...state,
                loading: true,
            };
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        case GET_PROFILE_REPOS :
            return{
                ...state,
                repos:action.payload
            };
        case CLEAR_PROFILE_DATA:
            return{
                ...state,
                profile:null
            };
        default:
            return state;
    }
}