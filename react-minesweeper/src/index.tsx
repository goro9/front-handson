import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface SquarePropsIf {
  element: number;
  isOpen: boolean;
  onClick: () => void;
}

function Square(props: SquarePropsIf) {
  const cellStr = props.isOpen ? ((props.element === Board.bomb) ? 'B' : String(props.element)) : "";

  return (
    <button className="square" onClick={props.onClick}>
      {cellStr}
    </button>
  );
}

interface BoardPropsIf {
  squares: Array<string>;
}
interface BoardStateIf {
  cells: number[][];
  isOpen: boolean[][];
  status: gameStatus;
  step: number;
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
  static bomb: number = -1; //bomb扱いする数字(0~8以外)

  constructor(props: BoardPropsIf) {
    super(props);
    this.state = {
      cells: this.initCells(),
      isOpen: this.initIsOpen(),
      status: gameStatus.ready,
      step: 0,
    };
    console.log(this.state.cells);
  }

  initIsOpen() {
    let cells: boolean[][] = Array(Board.xMax).fill(false);
    for (let r = 0; r < Board.xMax; r++) {
      cells[r] = Array(Board.yMax).fill(false);
    }

    return cells;
  }

  initCells() {
    // let bombs: boolean[][] = Array(Board.xMax).fill((Array(Board.yMax).fill(false)));
    let cells: number[][] = Array(Board.xMax).fill(0);
    for (let r = 0; r < Board.xMax; r++) {
      cells[r] = Array(Board.yMax).fill(0);
    }
    this.initBombs(cells);
    this.initNums(cells);

    return cells;
  }

  initBombs(bombs: number[][]) {

    let i = 0;
    while (i < Board.bombNum) {
      const pos = rand(Board.xMax * Board.yMax - 1);
      const x = Math.floor(pos / Board.xMax);
      const y = pos % Board.xMax;
      if (bombs[x][y] !== Board.bomb) {
        bombs[x][y] = Board.bomb;
        i++;
      }
    }
  }

  initNums(cells: number[][]) {
    for(let r = 0; r < Board.xMax; r++) {
      for (let c = 0; c < Board.yMax; c++) {
        if (cells[r][c] !== Board.bomb) {
          cells[r][c] = this.calcNum(cells, r, c);
        }
      }
    }
  }

  calcNum(cells: number[][], x: number, y: number) {
    let num: number = 0;
    const arroundCellFull: {x: number, y: number}[] = [
      {x: x - 1, y: y - 1},
      {x: x - 1, y: y    },
      {x: x - 1, y: y + 1},
      {x: x    , y: y - 1},
      {x: x    , y: y + 1},
      {x: x + 1, y: y - 1},
      {x: x + 1, y: y    },
      {x: x + 1, y: y + 1},
    ];

    const arroundCell = arroundCellFull.filter((cell) => {
      return (cell.x >= 0 && cell.y >= 0 && cell.x < cells.length && cell.y < cells[0].length);
    });

    arroundCell.forEach((cell) => {
      if (cells[cell.x][cell.y] === Board.bomb) {
        num++;
      }
    })
    return num;
  }
    
  handleClick(x: number, y: number) {
    const cells = this.state.cells.slice();
    const isOpen = this.state.isOpen.slice();
    let status = this.state.status;
    const step = this.state.step + 1;

    if (status === gameStatus.win || status === gameStatus.loss) {
      return;
    }

    isOpen[x][y] = true;
    if (cells[x][y] === Board.bomb) {
      status = gameStatus.loss;
    }

    if (step >= (Board.xMax * Board.yMax - Board.bombNum)) {
      status = gameStatus.win;
    }

    this.setState({
      isOpen: isOpen,
      status: status,
      step: step,
    });
  }

  renderSquare(x: number, y: number) {
    return (
      <Square
        element={this.state.cells[x][y]}
        isOpen={this.state.isOpen[x][y]}
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
          <Board squares={Array(9).fill('')}/>
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
