import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import Navbar from './components/src/Navbar';
import Footer from './components/src/Footer';
import Landing from './components/src/Landing';
import Login from './components/src/auth/Login';
import Register from './components/src/auth/Register';
import Dashboard from './components/src/profile/Dashboard';
import CreateProfile from './components/src/create-profile/createProfile';
import EditProfile from './components/src/edit-profile/editProfile';
import {logoutUser, setCurrentUser} from "./actions/authActions";
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import PrivateRoute from './components/src/common/PrivateRoute';
import AddExperience from "./components/src/add-credentials/AddExperience";
import AddEducation from "./components/src/add-credentials/AddEducation";
import Profiles from './components/src/profile/Profiles';
import Profile from './components/src/handle/Profile';
import Posts from "./components/src/posts/Posts";
import Post from "./components/src/posts/Post";

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

setTimeout(() => {
    if (localStorage.jwt) {
        window.location.reload(true);
    }
},3600000);

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
                        <Route exact path="/profiles" component={Profiles}/>
                        <Route exact path="/profile/:handle" component={Profile}/>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/add-education" component={AddEducation}/>
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/feed" component={Posts}/>
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/post/:id" component={Post}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
