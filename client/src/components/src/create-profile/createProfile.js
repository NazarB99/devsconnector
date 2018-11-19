import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldComponent';
import TextAreaGroup from '../common/TextAreaComponent';
import SelectFieldGroup from '../common/SelectAreaComponent';
import InputFieldGroup from '../common/InputAreaComponent';
import PropTypes from 'prop-types';

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInputs:false,
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            errors:{}
        }

    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        const {errors, displaySocialInputs} = this.state;

        let socialInputs;

        if (displaySocialInputs){
            socialInputs = (
                <div className="mt-2">
                    <InputFieldGroup name="twitter" error={errors.twitter} value={this.state.twitter} icon="fab fa-twitter" onChange={this.onChange}/>
                    <InputFieldGroup name="youtube" error={errors.youtube} value={this.state.youtube} icon="fab fa-youtube" onChange={this.onChange}/>
                    <InputFieldGroup name="facebook" error={errors.facebook} value={this.state.facebook} icon="fab fa-facebook" onChange={this.onChange}/>
                    <InputFieldGroup name="linkedin" error={errors.linkedin} value={this.state.linkedin} icon="fab fa-linkedin" onChange={this.onChange}/>
                </div>
            )
        }

        const options = [
            {
                label:'* Select Professional Status',
                value:0
            },
            {
                label:'Developer',
                value:'Developer'
            },
            {
                label:'Junior Developer',
                value:'Junior Developer'
            },
            {
                label:'Senior Developer',
                value:'Senior Developer'
            },
            {
                label:'Manager',
                value:'Manager'
            },
            {
                label:'Student',
                value:'Student'
            },
            {
                label:'Other',
                value:'Other'
            },
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create Your Profile
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3 text-center">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup name="handle" value={this.state.handle} type="text"
                                                onChange={this.onChange} error={errors.handle}
                                                placeholder="* Profile Handle"
                                                info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectFieldGroup name="status" value={this.state.status} options={options} error={errors.status} onChange={this.onChange}/>
                                <TextFieldGroup name="company" value={this.state.company} type="text"
                                                onChange={this.onChange} error={errors.company}
                                                placeholder="Company"
                                />
                                <TextFieldGroup name="website" value={this.state.website} type="text"
                                                onChange={this.onChange} error={errors.website}
                                                placeholder="Website"
                                />
                                <TextFieldGroup name="location" value={this.state.location} type="text"
                                                onChange={this.onChange} error={errors.location}
                                                placeholder="Location"
                                />
                                <TextFieldGroup name="skills" value={this.state.skills} type="text"
                                                onChange={this.onChange} error={errors.skills}
                                                placeholder="Skills"
                                                info="Please use comma to separate skills"
                                />
                                <TextFieldGroup name="githubusername" value={this.state.githubusername} type="text"
                                                onChange={this.onChange} error={errors.githubusername}
                                                placeholder="Your GitHub username"
                                />
                                <TextAreaGroup name="bio" value={this.state.bio} onChange={this.onChange} placeholder="A short bio of yourself"/>
                                <div className="mb-3">
                                    <button onClick={() => {
                                        this.setState(prevState => ({ displaySocialInputs: !prevState.displaySocialInputs}))
                                    }} className="btn btn-grey">Add Social Network Links</button>
                                    <span className="text-muted ml-1">Optional</span>
                                    {socialInputs}
                                    <input type="submit" value="Submit" name="submit" className="btn btn-primary"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes ={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile:state.profile,
  errors:state.errors
});

export default connect(mapStateToProps)(CreateProfile);