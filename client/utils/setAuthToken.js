import axios from 'axios';

setAuthToken = token => {
    if (token){
        axios.defaults.headers.common['Authorization'] = token;
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
};

export default setAuthToken;