import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getProfiles} from "../../../actions/profileActions";
import Spinner from '../common/Spinner';
import ProfileItem from "./ProfileItem";

class Profiles extends Component{

    componentDidMount(){
        this.props.getProfiles();
    }

    render(){
        const {profiles,loading} = this.props.profile;
        let profileItems;
        if (profiles === null || loading === true){
            profileItems = <Spinner/>
        }
        else{
            if (Object.keys(profiles).length > 0){
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile}/>
                ))
            }
            else{
                profileItems = <div>No Profiles</div>
            }
        }

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">List of Profiles</h1>
                        {profileItems}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
   profile:state.profile
});

export default connect(mapStateToProps,{getProfiles})(Profiles);