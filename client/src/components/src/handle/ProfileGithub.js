import React, {Component} from 'react';
import isEmpty from "../../../validation/is-empty";

class ProfileGithub extends Component {
    constructor(props){
        super(props);

        this.state ={
            repos:[]
        }
    }
    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.githubusername}/repos`)
            .then(res => res.json())
            .then(data => {
                this.setState({repos:data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {repos} = this.state;
        let reposContent;
        if (isEmpty(repos)) {
            reposContent = (
                <h4>No repos for this user</h4>
            );
        }
        else {
            reposContent = repos.map(repo => (
                <div className="card card-body mb-2">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>
                                <a href={repo.html_url} className="text-info" target="_blank"> {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div className="col-md-6">
                  <span className="badge badge-info mr-1">
                    Stars: {repo.stargazers_count}
                  </span>
                            <span className="badge badge-secondary mr-1">
                    Watchers: {repo.watchers_count}
                  </span>
                            <span className="badge badge-success">
                    Forks: {repo.forks}
                  </span>
                        </div>
                    </div>
                </div>
            ))
        }
        return (
            <div ref="myRef">
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                {reposContent}
            </div>
        )
    }
}

export default ProfileGithub;