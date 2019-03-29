const Cell = require('./Cell');

class Grid {
  constructor(rows, columns) {
    this._rows = rows;
    this._columns = columns;
    this.prepareGrid();
    this.configureCells();
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }

  get grid() {
    return this._grid;
  }

  prepareGrid() {
    this._grid = [];
    for (let j = 0; j < this.rows; j++) {
      this._grid.push([]);
      for (let i = 0; i < this.columns; i++) {
        this._grid[j].push(new Cell(i, j));
      }
    }
  }

  configureCells() {
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        let cell = this._grid[j][i];

        let row = cell.row,
            col = cell.column;

        if (row > 0) {
          cell.north = this.getCell(row - 1, col);
          // console.log(cell.north);
        }
        if (row < this.rows - 1) {
          cell.south = this.getCell(row + 1, col);
        }
        if (col < this.cols - 1) {
          cell.east  = this.getCell(row, col + 1);
          // console.log(cell.east);
        }
        if (col > 0) {
          cell.west  = this.getCell(row, col - 1);
        }
        // console.log(cell) 
      }
    }
  }

  getCell(row, col) {
    if (row < 0 || row > this.rows - 1) {
      return null;
    } 
    if (col < 0 || col > this.cols - 1) {
      return null;
    }
    return this.grid[row][col];
  }

  getRandomCell() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.grid[row].length);
    return this.grid[row][col];
  }

  size() {
    return this.rows * this.columns;
  }

  *eachRow() {
    for (let row of this.grid) {
      yield row;
    }
  }

  *[Symbol.iterator]() {
    for (let row of this.eachRow()) {
      for (let cell of row) {
        if (cell) {
          yield cell;
        }
      }
    }
  }

  [Symbol.species](i, j) {
    return this.grid[i][j];
  }

  toString() {
		let output = '+' + '---+'.repeat(this.columns) + '\n';
		for (let row of this.eachRow()) {
      let top = '|';
      let bottom = '+';

      for (let cell of row) {
        if (!cell) {
          cell = new Cell(-1 , -1);
        }
        let body = '   ';
        let east_boundary = cell.isLinked(cell.east) ? ' ' : '|';
        top += body + east_boundary;

        let south_boundary = cell.isLinked(cell.south) ? '   ' : '---';
        let corner = '+';
        bottom += south_boundary + corner;  
      }
      output += top + '\n' + bottom + '\n';
    }
		return output;
	}

}

// Exports
module.exports = Grid;

// Tests START //
let grid = new Grid(2, 7);
// console.log(grid.getRandomCell())
// for (let cell of grid) {
//   console.log(cell);
// }
console.log(grid.toString());
// grid.eachCell(cell => console.log(cell.name))
// Tests END //