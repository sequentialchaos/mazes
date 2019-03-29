const Grid = require('./Grid');

class BinaryTree {
  on(grid) {
    for (let cell of grid) {
      // console.log(cell)
      let neighbors = [];

      if (cell.north) {
        neighbors.push(cell.north);
      }
      if (cell.east) {
        neighbors.push(cell.east);
      }
      
      let index = Math.floor(Math.random() * neighbors.length);
      let neighbor = neighbors[index];
      if (neighbor) {
        cell.link(neighbor);
        // console.log(cell.links);
      }
    }
    return grid;
  }
}

let grid = new Grid(2, 2);
let b = new BinaryTree();
b.on(grid);
// console.log(grid)

