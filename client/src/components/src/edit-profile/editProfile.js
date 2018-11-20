import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldComponent';
import TextAreaGroup from '../common/TextAreaComponent';
import SelectFieldGroup from '../common/SelectAreaComponent';
import InputFieldGroup from '../common/InputAreaComponent';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import {createProfile,setCurrentProfile} from "../../../actions/profileActions";
import {withRouter} from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            errors: {}
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if (nextProps.profile.profile){
            const profile = nextProps.profile.profile;
            console.log(profile);

            const skillsCSV = profile.skills.join(',');
            profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';

            this.setState({
                handle:profile.handle,
                company:profile.company,
                website:profile.website,
                status:profile.status,
                location:profile.location,
                githubusername:profile.githubusername,
                bio:profile.bio,
                twitter:profile.twitter,
                facebook:profile.facebook,
                linkedin:profile.linkedin,
                youtube:profile.youtube,
                skills:skillsCSV,
            });

        }
    }

    componentDidMount(){
        this.props.setCurrentProfile();
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newProfile = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
        };

        this.props.createProfile(newProfile, this.props.history)
    };

    render() {
        const {errors, displaySocialInputs} = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div className="mt-2">
                    <InputFieldGroup name="twitter" error={errors.twitter} value={this.state.twitter}
                                     icon="fab fa-twitter" onChange={this.onChange}/>
                    <InputFieldGroup name="youtube" error={errors.youtube} value={this.state.youtube}
                                     icon="fab fa-youtube" onChange={this.onChange}/>
                    <InputFieldGroup name="facebook" error={errors.facebook} value={this.state.facebook}
                                     icon="fab fa-facebook" onChange={this.onChange}/>
                    <InputFieldGroup name="linkedin" error={errors.linkedin} value={this.state.linkedin}
                                     icon="fab fa-linkedin" onChange={this.onChange}/>
                </div>
            )
        }

        const options = [
            {
                label: '* Select Professional Status',
                value: 0
            },
            {
                label: 'Developer',
                value: 'Developer'
            },
            {
                label: 'Junior Developer',
                value: 'Junior Developer'
            },
            {
                label: 'Senior Developer',
                value: 'Senior Developer'
            },
            {
                label: 'Manager',
                value: 'Manager'
            },
            {
                label: 'Student',
                value: 'Student'
            },
            {
                label: 'Other',
                value: 'Other'
            },
        ];


        let form;

        if (this.props.profile.profile === null || this.props.profile.loading === true) {
            form = (
                <Spinner/>
            )
        }
        else {
            form = (
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup name="handle" value={this.state.handle} type="text"
                                    onChange={this.onChange} error={errors.handle}
                                    disabled="disabled"
                                    placeholder="* Profile Handle"
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                    />
                    <SelectFieldGroup name="status" value={this.state.status} options={options}
                                      error={errors.status} onChange={this.onChange}/>
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
                    <TextAreaGroup name="bio" value={this.state.bio} error={errors.bio} onChange={this.onChange}
                                   placeholder="A short bio of yourself"/>
                    <div className="mb-3">
                        <button type="button" onClick={() => {
                            this.setState(prevState => ({displaySocialInputs: !prevState.displaySocialInputs}))
                        }} className="btn btn-grey">Add Social Network Links
                        </button>
                        <span className="text-muted ml-1">Optional</span>
                        {socialInputs}
                        <input type="submit" value="Submit" name="submit" className="btn btn-primary mt-3" style={{width:'100%'}}/>
                    </div>
                </form>
            );
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Edit Your Profile
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3 text-center">* = required fields</small>
                            {form}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile,setCurrentProfile})(withRouter(EditProfile));