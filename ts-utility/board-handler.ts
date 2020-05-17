
export class Cells<T> {
    board: T[][];
    rowMax: number;
    colMax: number;
    cellNum: number;

    constructor (rowMax: number, colMax: number, initVal: T) {
        this.board = Array(rowMax).fill(initVal);
        this.rowMax = rowMax;
        this.colMax = colMax;
        this.cellNum = rowMax * colMax;
        for (let r = 0; r < rowMax; r++) {
            this.board[r] = Array(colMax).fill(initVal);
        }
    }

    forAll (callback: (elm: T, row?: number, col?: number) => void) {
        for (let r = 0; r < this.rowMax; r++) {
            for (let c = 0; c < this.colMax; c++) {
                callback(this.board[r][c], r, c);
            }
        }
    }

    forAround (row: number, col: number, callback: (row: number, col: number) => void) {
        const arroundCellFull: { r: number, c: number }[] = [
            { r: row - 1, c: col - 1 },
            { r: row - 1, c: col },
            { r: row - 1, c: col + 1 },
            { r: row    , c: col - 1 },
            { r: row    , c: col + 1 },
            { r: row + 1, c: col - 1 },
            { r: row + 1, c: col },
            { r: row + 1, c: col + 1 },
        ];
    
        const arroundCell = arroundCellFull.filter((elm) => {
            return (elm.r >= 0 && elm.c >= 0 && elm.r < this.board.length && elm.c < this.board[0].length);
        });
    
        arroundCell.forEach((elm) => {
            callback(elm.r, elm.c);
        })
    }
}

(() => {
    main();
})();

function main() {
    let game = new Cells<number>(9, 9, 0);
    console.log(game.board);
    console.log(typeof(game.board[0][0]));

    let i = 0;
    for (let x = 0; x < 9; x++) {
        game.board[x] = Array(9);
        for (let y = 0; y < 9; y++) {
            game.board[x][y] = i;
            ++i;
        }
    }
    
    console.log(game.board);
    console.log(typeof(game.board[0][0]));
    game.forAround(1, 0, (x, y) => {
        console.log(x, y, game.board[x][y]);
    })

    game.forAll((elm, r, c) => {
        console.log(r, c, elm);
    })
}
