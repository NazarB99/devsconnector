import {SET_CURRENT_PROFILE, SET_PROFILE_LOADING} from "../actions/types";

const initialState = {
    profile: null,
    profiles: null,
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
        default:
            return state;
    }
}