import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProfileByHandle} from "../../../actions/profileActions";
import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    render() {
        const {profile, loading} = this.props.profile;
        let profileContent;
        if (profile === null || loading === true) {
            profileContent = <Spinner/>
        }
        else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">Go Back</Link>
                        </div>
                        <div className="col-md-6"/>
                    </div>
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds profile={profile}/>
                    <ProfileGithub profile={profile}/>
                </div>
            )
        }


        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, {getProfileByHandle})(Profile);