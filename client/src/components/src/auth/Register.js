import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from '../../../actions/authActions';
import TextFiledGroup from '../common/TextFieldComponent';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const {errors} = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFiledGroup name="name" placeholder="Name" value={this.state.name} error={errors.name} onChange={this.onChange}/>
                                <TextFiledGroup name="email" placeholder="Email Address" info="This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email" value={this.state.email}
                                                type="email" error={errors.name} onChange={this.onChange}/>
                                <TextFiledGroup name="password" placeholder="Password" value={this.state.password}
                                                type="password" error={errors.password} onChange={this.onChange}/>
                                <TextFiledGroup name="password2" placeholder="Confirm Password" value={this.state.password}
                                                type="password" error={errors.password2} onChange={this.onChange}/>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));