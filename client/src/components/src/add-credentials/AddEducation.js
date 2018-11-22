import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldComponent';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaGroup from "../common/TextAreaComponent";
import {addEducation} from '../../../actions/profileActions';

class AddEducation extends Component {
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

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const expData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        };

        this.props.addEducation(expData,this.props.history);
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
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
                            <p className="lead text-center">Add any job or position that you have had in the past or
                                current</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup name="school" value={this.state.school} error={errors.school}
                                                type="text" onChange={this.onChange} placeholder="* School"/>
                                <TextFieldGroup name="degree" value={this.state.degree} error={errors.degree} type="text"
                                                onChange={this.onChange} placeholder="* Degree"/>
                                <TextFieldGroup name="fieldofstudy" value={this.state.fieldofstudy} error={errors.fieldofstudy}
                                                type="text" onChange={this.onChange} placeholder="Field of Study"/>
                                <TextFieldGroup name="location" value={this.state.location} error={errors.location}
                                                type="text" onChange={this.onChange} placeholder="Location"/>
                                <h6>From Date</h6>
                                <TextFieldGroup name="from" value={this.state.from} error={errors.from} type="date"
                                                onChange={this.onChange} placeholder="* From"/>
                                <h6>To Date</h6>
                                <TextFieldGroup name="to" value={this.state.to} type="date" error={errors.to}
                                                onChange={this.onChange} placeholder="To"
                                                disabled={this.state.disabled ? 'disabled' : ''}/>
                                <div className="form-check mb-4">
                                    <input type="checkbox" className="form-check-input" onChange={this.onCheck}
                                           checked={this.state.current} value={this.state.current} id="current"/>
                                    <label htmlFor="current" className="form-check-label">Current Job</label>
                                </div>
                                <TextAreaGroup name="description" error={errors.description}
                                               value={this.state.description} onChange={this.onChange}/>
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation));