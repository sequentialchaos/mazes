class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.name = `${row},${column}`;
    this._links = {};

    this._north = null;
    this._south = null;
    this._east = null;
    this._west = null;
  }

  get links() {
    return Object.keys(this._links);
  }

  set links(new_links) {
    this._links = new_links;
  }

  get north() {
    return this._north;
  }

  set north(new_north) {
    this._north = new_north
  }

  get south() {
    return this._south;
  }

  set south(new_south) {
    this._south = new_south
  }

  get east() {
    return this._east;
  }

  set east(new_east) {
    this._east = new_east
  }

  get west() {
    return this._west;
  }

  set west(new_west) {
    this._west= new_west
  }

  link(cell, bidi=true) {
    this._links[cell.name] = true;
    if (bidi) {
      cell.link(this, false);
    }
    return this;
  }

  unlink(cell, bidi=true) {
    delete this._links[cell.name];
    if (bidi) {
      cell.unlink(this, false);
    }
    return this;
  }

  isLinked(cell) {
    return (cell in this.links);
  }

  neighbors() {
    let list = [];
    if (this._north) {
      list.push(this._north);
    }
    if (this._south) {
      list.push(this._south);
    }
    if (this._east) {
      list.push(this._east);
    }
    if (this._west) {
      list.push(this._west);
    }
  }
}

// Exports //
module.exports = Cell;


// Testing START //
// let c0 = new Cell(0, 0),
//     c1 = new Cell(0, 1),
//     c2 = new Cell(1, 1);
// Testing END //

