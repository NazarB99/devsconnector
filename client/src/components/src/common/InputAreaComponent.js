import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputFieldGroup = ({name,placeholder,value,label,icon,error,onChange}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend" >
                <span className="input-group-text">
                    <i className={icon} style={{width:'18px'}} />
                </span>
            </div>
            <input className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })} name={name} value={value} placeholder="Please enter a valid URL" onChange={onChange} />
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
};

InputFieldGroup.propTypes ={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    error:PropTypes.string,
    label:PropTypes.string,
    icon:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
};

export default InputFieldGroup;