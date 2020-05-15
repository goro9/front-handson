
let forAround = (cells: number[][], x: number, y: number, callback: (arX: number, arY: number) => void) => {
    const arroundCellFull: { x: number, y: number }[] = [
        { x: x - 1, y: y - 1 },
        { x: x - 1, y: y },
        { x: x - 1, y: y + 1 },
        { x: x, y: y - 1 },
        { x: x, y: y + 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y: y },
        { x: x + 1, y: y + 1 },
    ];

    const arroundCell = arroundCellFull.filter((cell) => {
        return (cell.x >= 0 && cell.y >= 0 && cell.x < cells.length && cell.y < cells[0].length);
    });

    arroundCell.forEach((cell) => {
        callback(cell.x, cell.y);
    })
}

(() => {
    main();
})();


function main() {
    let cells: number[][] = Array(9);

    let i = 0;
    for (let x = 0; x < 9; x++) {
        cells[x] = Array(9);
        for (let y = 0; y < 9; y++) {
            cells[x][y] = i;
            ++i;
        }
    }

    forAround(cells, 2, 2, (ax, ay) => {
        console.log(ax, ay);
    })

}

