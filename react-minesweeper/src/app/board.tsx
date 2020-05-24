import React from 'react';
import '../index.css';
import assert from 'assert';
import { MineBoardElement, gameStatus, cellStatus } from './common'
import { Cells, rand } from './utils';
import { Cell } from './cell'

interface BoardPropsIf {
  
}

interface BoardStateIf {
  status: gameStatus;
  cells: Cells<MineBoardElement>;
}

export class Board extends React.Component<BoardPropsIf, BoardStateIf> {
  static xMax: number = 30;
  static yMax: number = 16;
  static bombNum: number = 99;
  private isInitialized: boolean;

  constructor(props: BoardPropsIf) {
    super(props);
    const initialCell: MineBoardElement = {
      isBomb: false,
      status: cellStatus.close,
      bombCount: 0,
    }
    this.state = {
      status: gameStatus.ready,
      cells: new Cells(Board.xMax, Board.yMax, initialCell)
    };
    this.isInitialized = false;
    // this.handleClick = this.handleClick.bind(this);
    // this.handleRightClick = this.handleRightClick.bind(this);
  }

  initBombs(cells: Cells<MineBoardElement>, xFirst: number, yFirst: number) {
    assert(!this.isInitialized);
    const isFirstCells: Cells<boolean> = new Cells(Board.xMax, Board.yMax, false);

    isFirstCells.board[xFirst][yFirst] = true;
    isFirstCells.forAround(xFirst, yFirst, (cbr, cbc) => {
      isFirstCells.board[cbr][cbc] = true;
    });

    let i = 0;
    while (i < Board.bombNum) {
      const pos = rand(Board.xMax * Board.yMax - 1);
      const x = Math.floor(pos / Board.yMax);
      const y = pos % Board.yMax;
      if (!cells.board[x][y].isBomb && !isFirstCells.board[x][y]) {
        cells.board[x][y] = Object.assign({}, cells.board[x][y], {isBomb: true});
        i++;
      }
    }
  }

  initNums(cells: Cells<MineBoardElement>) {
    assert(!this.isInitialized);
    cells.forAll((elm, rr, cc) => {
      const r = rr!;
      const c = cc!;
      if (!elm.isBomb) {
        let cnt = 0;
        cells.forAround(r, c, (cbr, cbc) => {
          if (cells.board[cbr][cbc].isBomb) {
            cnt++;
          }
        });
        cells.board[r][c] = Object.assign({}, elm, {bombCount: cnt});
      }
    })
  }

  handleRightClick(x: number, y: number, e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const cells = this.state.cells;
    let status = this.state.status;

    if (status === gameStatus.win || status === gameStatus.loss) {
      return;
    }

    switch (cells.board[x][y].status) {
      case cellStatus.close:
        cells.board[x][y] = Object.assign({}, cells.board[x][y], {status: cellStatus.flag});
        break;
      case cellStatus.open:
        break;
      case cellStatus.flag:
        cells.board[x][y] = Object.assign({}, cells.board[x][y], {status: cellStatus.close});
        break;
      default:
        assert(false);
    }

    // TODO: count flag

    this.setState({
      cells: cells,
    });
  }

  handleClick(x: number, y: number) {
    const cells = this.state.cells;
    let status = this.state.status;

    if (status === gameStatus.win || status === gameStatus.loss) {
      return;
    }

    if (cells.board[x][y].status === cellStatus.flag) {
      return;
    }

    if (!this.isInitialized) {
      this.initBombs(cells, x, y);
      this.initNums(cells);
      this.isInitialized = true;
      status = gameStatus.inGame;
    }

    cells.board[x][y] = Object.assign({}, cells.board[x][y], {status: cellStatus.open});
    if (cells.board[x][y].bombCount === 0 && !cells.board[x][y].isBomb) {
      // open around cell
      cells.forAround(x, y, (cbx, cby) => {
        if (cells.board[cbx][cby].status === cellStatus.close) {
          this.handleClick(cbx, cby)
        }
      });
    }

    if (cells.board[x][y].isBomb) {
      status = gameStatus.loss;
    }

    let openCount = 0
    cells.forAll((elm) => {
      if (elm.status === cellStatus.open) {
        openCount++;
      }
    });
    if (openCount >= (cells.cellNum - Board.bombNum)) {
      status = gameStatus.win;
    }

    this.setState({
      cells: cells,
      status: status,
    });
  }

  renderCell(x: number, y: number) {
    const key =  ('00' + x).slice(-2) + ":" + ('00' + y).slice(-2);

    return (
      <Cell
        key={key}
        cell={this.state.cells.board[x][y]}
        onClick={() => this.handleClick(x, y)}
        onRightClick={(e) => this.handleRightClick(x, y, e)}
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

    const boardJsx: JSX.Element[] = Array(Board.xMax);
    for (let r = 0; r < Board.xMax; r++) {
      const key = ('00' + r).slice(-2);
      const colJsx: JSX.Element[] = Array(Board.yMax);
      for (let c = 0; c < Board.yMax; c++) {
        colJsx.push(this.renderCell(r, c));
      }
      boardJsx.push(<div key={key} className="board-row">{colJsx}</div>);
    }

    return (
      <div>
        <div className="status">{statusStr}</div>
        {boardJsx}
      </div>
    );
  }
}
