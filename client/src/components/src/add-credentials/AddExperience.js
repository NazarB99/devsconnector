import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldComponent';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaGroup from "../common/TextAreaComponent";

class AddExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
    };

    onChange = (e) => {
      this.setState({[e.target.name]:e.target.value});
    };

    onCheck = () =>{
      this.setState({
          current: !this.state.current,
          disabled: !this.state.disabled
      })
    };

    render() {
        const {errors} = this.state;

        return (
           <div className="add-experience ">
               <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                        <h1 className="display-4 text-center">Add Experience</h1>
                        <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onChange={this.onSubmit}>
                            <TextFieldGroup name="company" value={this.state.company} error={errors.company} type="text" onChange={this.onChange} placeholder="* Company"/>
                            <TextFieldGroup name="title" value={this.state.title} error={errors.title} type="text" onChange={this.onChange} placeholder="* Title"/>
                            <TextFieldGroup name="location" value={this.state.location} error={errors.location} type="text" onChange={this.onChange} placeholder="Location"/>
                            <h6>From Date</h6>
                            <TextFieldGroup name="from" value={this.state.from} error={errors.from} type="date" onChange={this.onChange} placeholder="* From"/>
                            <h6>To Date</h6>
                            <TextFieldGroup name="to" value={this.state.to} type="date" error={errors.to} onChange={this.onChange} placeholder="To" disabled={this.state.disabled ? 'disabled' : ''}/>
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" name="current" checked={this.state.current} value={this.state.current} onChange={this.onCheck} id="current" />
                                <label htmlFor="current" className="form-check-label">Current Job</label>
                            </div>
                            <TextAreaGroup name="description" error={errors.description} value={this.state.description} onChange={this.onChange}/>
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
               </div>
           </div>
        )
    }

}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddExperience));