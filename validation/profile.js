const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle,{min:2,max:40})){
        errors.handle = 'Handle needs to be 2 and 40 characters'
    }

    if (Validator.isEmpty(data.handle)){
        errors.handle = 'Handle is required'
    }

    if (Validator.isEmpty(data.status)){
        errors.status = 'Status is required'
    }

    if (Validator.isEmpty(data.skills)){
        errors.skills = 'Skills is required'
    }

    if (!isEmpty(data.website)){
        if (!Validator.isURL(data.website)){
            errors.website = "Website need to be formatted as URL";
        }
    }

    if (!isEmpty(data.youtube)){
        if (!Validator.isURL(data.youtube)){
            errors.youtube = "Youtube need to be formatted as URL";
        }
    }

    if (!isEmpty(data.twitter)){
        if (!Validator.isURL(data.twitter)){
            errors.twitter = "Twitter need to be formatted as URL";
        }
    }

    if (!isEmpty(data.linkedin)){
        if (!Validator.isURL(data.linkedin)){
            errors.linkedin = "LinkedIn need to be formatted as URL";
        }
    }

    if (!isEmpty(data.facebook)){
        if (!Validator.isURL(data.facebook)){
            errors.facebook = "Facebook need to be formatted as URL";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};