import React,{Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from "../../../actions/profileActions";

class Experience extends Component{
    onDeleteExperience(id) {
          this.props.deleteExperience(id);
    };

    render(){
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.current ? "Now" : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                </td>
                <td><button className="btn btn-danger" onClick={this.onDeleteExperience.bind(this,exp._id)}>Delete</button></td>
            </tr>
        ));
        return(
            <div>
                <h4 className="mb-2">Experience Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Company</td>
                        <td>Title</td>
                        <td>From - To</td>
                        <td></td>
                    </tr>
                    {experience}
                    </thead>
                </table>
            </div>
        );
    }
}

export default connect(null,{deleteExperience})(Experience);