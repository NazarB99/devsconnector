import React, {Component} from 'react';
import {setCurrentProfile} from "../../../actions/profileActions";
import {connect} from 'react-redux';

class Dashboard extends Component {
    componentDidMount() {
        this.props.setCurrentProfile();
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default connect(null, {setCurrentProfile})(Dashboard);