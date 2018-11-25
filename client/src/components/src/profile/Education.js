import React,{Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from "../../../actions/profileActions";

class Education extends Component{
    onDeleteEducation(id) {
        this.props.deleteEducation(id);
    };

    render(){
        const education = this.props.experience.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldofstudy}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.current ? "Now" : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                </td>
                <td><button className="btn btn-danger" onClick={this.onDeleteEducation.bind(this,edu._id)}>Delete</button></td>
            </tr>
        ));
        return(
            <div>
                <h4 className="mb-2">Experience Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <td>School</td>
                        <td>Degree</td>
                        <td>Field of Study</td>
                        <td>From - To</td>
                        <td></td>
                    </tr>
                    {education}
                    </thead>
                </table>
            </div>
        );
    }
}

export default connect(null,{deleteEducation})(Education);