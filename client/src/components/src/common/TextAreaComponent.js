import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaGroup = ({name,placeholder,value,label,error,info,onChange}) => {
    return (
        <div className="form-group">
            <textarea className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
                   placeholder={placeholder} value={value} name={name} onChange={onChange} />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
};

TextAreaGroup.propTypes ={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    error:PropTypes.string,
    info:PropTypes.string,
    onChange:PropTypes.func.isRequired,
};

export default TextAreaGroup;