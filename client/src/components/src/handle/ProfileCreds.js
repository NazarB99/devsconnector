import React, {Component} from 'react';
import Moment from 'react-moment';
import isEmpty from "../../../validation/is-empty";

class ProfileCreds extends Component {
    render() {
        const {profile} = this.props;
        return (
            <div className="row">
                <div className="col-md-6">
                    {isEmpty(profile.experience) ? "" : (
                        <div>
                            <h3 className="text-center text-info">Experience</h3>
                            <ul className="list-group">
                                {profile.experience.map(exp => (
                                    <li className="list-group-item">
                                        <h4>{exp.company}</h4>
                                        <p><Moment
                                            format="MMM Do YYYY">{exp.from}</Moment> - {exp.current ? "Current" : (
                                            <Moment format="MMM Do YYYY">{exp.to}</Moment>)}</p>
                                        <p>
                                            <strong>Position:</strong> {exp.title}
                                        </p>
                                        <p>
                                            {isEmpty(exp.description) ? "" : (
                                                <div>
                                                    <strong>Description:</strong> {exp.description}
                                                </div>
                                            )}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {isEmpty(profile.education) ? "" : (
                        <div>
                            <h3 className="text-center text-info">Education</h3>
                            < ul className="list-group">
                                {profile.education.map(edu => (
                                    <li className="list-group-item">
                                        <h4>{edu.school}</h4>
                                        <p><Moment
                                            format="MMM Do YYYY">{edu.from}</Moment> - {edu.current ? "Current" : (
                                            <Moment format="MMM Do YYYY">{edu.to}</Moment>)}</p>
                                        <p>
                                            <strong>Degree: </strong>{edu.degree}</p>
                                        <p>
                                            <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                                        <p>
                                            <p>
                                                {isEmpty(edu.description) ? "" : (
                                                    <div>
                                                        <strong>Description:</strong> {edu.description}
                                                    </div>
                                                )}
                                            </p>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default ProfileCreds