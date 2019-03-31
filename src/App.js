import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Logo />
      </div>
    );
  }
}

export default App;
