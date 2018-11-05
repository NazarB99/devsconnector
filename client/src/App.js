import React, { Component } from 'react';
import Navbar from './components/src/Navbar';
import Footer from './components/src/Footer';
import Landing from './components/src/Landing';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <Landing/>
          <Footer/>
      </div>
    );
  }
}

export default App;
