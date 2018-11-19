import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {setCurrentProfile,deleteAccount} from "../../../actions/profileActions";
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import ProfileActions from './profileActions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.setCurrentProfile();
    }

    onDeleteClick = (e) => {
      this.props.deleteAccount();
    };

    render() {
        const {profile, loading} = this.props.profile;
        const {user} = this.props.auth;

        let dashboardContent;

        if (profile === null || loading === true){
            dashboardContent = <Spinner/>
        }
        else{
            if (Object.keys(profile).length > 0){
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions/>
                        <div style={{marginTop:'60px'}}/>
                        <button className="btn btn-danger" onClick={this.onDeleteClick}>Delete Account</button>
                    </div>
                )
            }
            else {
                dashboardContent = (
                  <div>
                      <p className="lead text-muted">Welcome {user.name}</p>
                      <p>You haven't created your profile yet. Click the button below to create one</p>
                      <Link to="/create-profile" className="btn btn-lg btn-success">Create Profile</Link>
                  </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">
                                Dashboard
                            </h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   profile:state.profile,
   auth:state.auth,
   errors:state.errors
});

export default connect(mapStateToProps, {setCurrentProfile,deleteAccount})(Dashboard);