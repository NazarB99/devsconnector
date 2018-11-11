import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import Navbar from './components/src/Navbar';
import Footer from './components/src/Footer';
import Landing from './components/src/Landing';
import Login from './components/src/auth/Login';
import Register from './components/src/auth/Register';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';



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
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
