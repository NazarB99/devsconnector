import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import Navbar from './components/src/Navbar';
import Footer from './components/src/Footer';
import Landing from './components/src/Landing';
import Login from './components/src/auth/Login';
import Register from './components/src/auth/Register';
import Dashboard from './components/src/profile/Dashboard';
import {logoutUser, setCurrentUser} from "./actions/authActions";
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import PrivateRoute from './components/src/common/PrivateRoute';

if (localStorage.jwt){
    setAuthToken(localStorage.jwt);
    const decoded = jwt_decode(localStorage.jwt);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
