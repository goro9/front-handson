import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Cells } from './board-handler';

interface SquarePropsIf {
  cell: MineBoardElement;
  onClick: () => void;
}

function Square(props: SquarePropsIf) {
  const cellStr = props.cell.isOpen ? ((props.cell.isBomb) ? 'B' : String(props.cell.bombCount)) : "";

  return (
    <button className="square" onClick={props.onClick}>
      {cellStr}
    </button>
  );
}

type MineBoardElement = {
  isBomb: boolean;
  isOpen: boolean;
  bombCount: number;
}
interface BoardPropsIf {
  
}
interface BoardStateIf {
  status: gameStatus;
  step: number;
  cells: Cells<MineBoardElement>;
}
enum gameStatus {
  ready,
  inGame,
  win,
  loss,
}
class Board extends React.Component<BoardPropsIf, BoardStateIf> {
  static xMax: number = 9;
  static yMax: number = 9;
  static bombNum: number = 10;

  constructor(props: BoardPropsIf) {
    super(props);
    const initialCell: MineBoardElement = {
      isBomb: false,
      isOpen: false,
      bombCount: 0,
    }
    this.state = {
      status: gameStatus.ready,
      step: 0,
      cells: new Cells(Board.xMax, Board.yMax, initialCell)
    };

    let cells = this.state.cells;
    this.initBombs(cells);
    this.initNums(cells);
    this.setState({
      cells: cells
    });

    console.log("cells");
    console.log(this.state.cells);
  }

  initBombs(cells: Cells<MineBoardElement>) {
    let i = 0;
    while (i < Board.bombNum) {
      const pos = rand(Board.xMax * Board.yMax - 1);
      const x = Math.floor(pos / Board.xMax);
      const y = pos % Board.xMax;
      // console.log(pos, x, y);
      if (!cells.board[x][y].isBomb) {
        cells.board[x][y] = Object.assign({}, cells.board[x][y], {isBomb: true});
        i++;
      }
    }
  }

  initNums(cells: Cells<MineBoardElement>) {
    for(let r = 0; r < Board.xMax; r++) {
      for (let c = 0; c < Board.yMax; c++) {
        if (!cells.board[r][c].isBomb) {
          let cnt = 0;
          cells.forAround(r, c, (cbr, cbc) => {
            if (cells.board[cbr][cbc].isBomb) {
              cnt++;
            }
          });
          cells.board[r][c] = Object.assign({}, cells.board[r][c], {bombCount: cnt});
        }
      }
    }
  }

  handleClick(x: number, y: number) {
    const cells = this.state.cells;
    let status = this.state.status;
    const step = this.state.step + 1;

    if (status === gameStatus.win || status === gameStatus.loss) {
      return;
    }

    cells.board[x][y].isOpen = true;
    if (cells.board[x][y].bombCount === 0) {
      // oprn around cell
    }

    if (cells.board[x][y].isBomb) {
      status = gameStatus.loss;
    }

    if (step >= (Board.xMax * Board.yMax - Board.bombNum)) {
      status = gameStatus.win;
    }

    this.setState({
      status: status,
      step: step,
    });
  }

  renderSquare(x: number, y: number) {
    return (
      <Square
        cell={this.state.cells.board[x][y]}
        onClick={() => this.handleClick(x, y)}
      />
    );
  }

  render() {
    let statusStr = ' ';
    if (this.state.status === gameStatus.loss) {
      statusStr = 'you are lose.';
    } else if (this.state.status === gameStatus.win) {
      statusStr = 'you are win.';
    }

    let boardJsx: JSX.Element[] = Array(Board.xMax);
    for (let r = 0; r < Board.xMax; r++) {
      let colJsx: JSX.Element[] = Array(Board.yMax);
      for (let c = 0; c < Board.yMax; c++) {
        colJsx.push(this.renderSquare(r, c));
      }
      boardJsx.push(<div className="board-row">{colJsx}</div>);
    }

    return (
      <div>
        <div className="status">{statusStr}</div>
        {boardJsx}
      </div>
    );
  }
}

class Game extends React.Component {
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

// ========================================

function rand(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
