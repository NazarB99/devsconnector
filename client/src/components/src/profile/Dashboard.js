import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {setCurrentProfile} from "../../../actions/profileActions";
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
    componentDidMount() {
        this.props.setCurrentProfile();
    }

    render() {
        const {profile, loading} = this.props.profile;
        const {user} = this.props.auth;

        let dashboardContent;

        if (profile === null || loading === true){
            dashboardContent = <Spinner/>
        }
        else{
            if (Object.keys(profile).length > 0){
                dashboardContent = <h1>Dashboard</h1>
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

export default connect(mapStateToProps, {setCurrentProfile})(Dashboard);