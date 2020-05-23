import React from 'react';
import '../index.css';
import { Board } from './board'

interface GamePropsIf {
  
}

interface GameStateIf {
  
}

export class Game extends React.Component<GamePropsIf, GameStateIf> {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
