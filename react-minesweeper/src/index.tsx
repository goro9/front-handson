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
}
class Board extends React.Component<BoardPropsIf, BoardStateIf> {
  static rowNum: number = 9;
  static colNum: number = 9;
  static bombNum: number = 10;
  static bomb: number = -1; //bomb扱いする数字(0~7以外)

  constructor(props: BoardPropsIf) {
    super(props);
    this.state = {
      cells: this.initCells(),
      isOpen: this.initIsOpen(),
    };
    console.log(this.state.cells);
  }

  initIsOpen() {
    let cells: boolean[][] = Array(Board.rowNum).fill(false);
    for (let r = 0; r < Board.rowNum; r++) {
      cells[r] = Array(Board.colNum).fill(false);
    }

    return cells;
  }

  initCells() {
    // let bombs: boolean[][] = Array(Board.rowNum).fill((Array(Board.colNum).fill(false)));
    let cells: number[][] = Array(Board.rowNum).fill(0);
    for (let r = 0; r < Board.rowNum; r++) {
      cells[r] = Array(Board.colNum).fill(0);
    }
    this.initBombs(cells);
    this.initNums(cells);

    return cells;
  }

  initBombs(bombs: number[][]) {

    let i = 0;
    while (i < Board.bombNum) {
      const pos = rand(Board.rowNum * Board.colNum - 1);
      const row = Math.floor(pos / Board.rowNum);
      const col = pos % Board.rowNum;
      if (bombs[row][col] !== Board.bomb) {
        bombs[row][col] = Board.bomb;
        i++;
      }
    }
    // console.log(bombs);
    // return bombs;
  }

  initNums(cells: number[][]) {
    for(let r = 0; r < Board.rowNum; r++) {
      for (let c = 0; c < Board.colNum; c++) {
        if (cells[r][c] !== Board.bomb) {
          cells[r][c] = this.calcNum(cells, r, c);
        }
      }
    }
  }

  calcNum(cells: number[][], row: number, col: number) {
    let num: number = 0;
    const arroundCellFull: {row: number, col: number}[] = [
      {row: row - 1, col: col - 1},
      {row: row - 1, col: col    },
      {row: row - 1, col: col + 1},
      {row: row    , col: col - 1},
      {row: row    , col: col + 1},
      {row: row + 1, col: col - 1},
      {row: row + 1, col: col    },
      {row: row + 1, col: col + 1},
    ];

    const arroundCell = arroundCellFull.filter((cell) => {
      return (cell.row >= 0 && cell.col >= 0 && cell.row < cells.length && cell.col < cells[0].length);
    });
    console.log(arroundCell);

    arroundCell.forEach((cell) => {
      if (cells[cell.row][cell.col] === Board.bomb) {
        num++;
      }
    })
    return num;
  }
    
  handleClick(row: number, col: number) {
    const isOpen = this.state.isOpen.slice();
    isOpen[row][col] = true;
    this.setState({
      isOpen: this.state.isOpen,
    });
  }

  renderSquare(row: number, col: number) {
    return (
      <Square
        element={this.state.cells[row][col]}
        isOpen={this.state.isOpen[row][col]}
        onClick={() => this.handleClick(row, col)}
      />
    );
  }

  render() {
    let boardJsx: JSX.Element[] = Array(Board.rowNum);
    for (let r = 0; r < Board.rowNum; r++) {
      let colJsx: JSX.Element[] = Array(Board.colNum);
      for (let c = 0; c < Board.colNum; c++) {
        colJsx.push(this.renderSquare(r, c));
      }
      boardJsx.push(<div className="board-row">{colJsx}</div>);
    }

    return (
      <div>
        <div className="status">{/* status */}</div>
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
