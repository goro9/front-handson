
class Board<T> {
    board: T[][];

    constructor (rowMax: number, colMax: number) {
        this.board = Array(rowMax);
        for (let r = 0; r < rowMax; r++) {
            this.board[r] = Array(colMax);
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
    let game = new Board(9, 9);
    let i = 0;
    for (let x = 0; x < 9; x++) {
        game.board[x] = Array(9);
        for (let y = 0; y < 9; y++) {
            game.board[x][y] = i;
            ++i;
        }
    }
    console.log(game.board);
    game.forAround(5, 5, (x, y) => {
        console.log(x, y, game.board[x][y]);
    })
}
