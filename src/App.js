import React, { Component } from 'react';
import './App.css';

import Game from './components/game';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to my 2048</h1>
        </header>
        <div className="container">
          <div className="row center-wrap">
            <button className="btn btn-lg btn-primary" onClick={() => this.game.newGame()}>Start new game</button>
          </div>

          <Game ref={instance => { this.game = instance; }} />
        </div>
      </div>
    );
  }
}

export default App;
