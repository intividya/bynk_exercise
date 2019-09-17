import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Form from './Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Form />
      </div>
    );
  }
}

export default App;
