import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectFieldGroup = ({name,options,value,label,error,info,onChange}) => {
    const selectOptions = options.map(option => (
       <option key={option.label} value={option.value}>
           {option.label}
       </option>
    ));
    return (
        <div className="form-group">
            <select className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })} name={name} onChange={onChange}>
                {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
};

SelectFieldGroup.propTypes ={
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    error:PropTypes.string,
    info:PropTypes.string,
    onChange:PropTypes.func.isRequired,
};

export default SelectFieldGroup;