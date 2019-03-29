const N = 20;
let cols, rows;
let w;
let grid = [];

let current;

let stack = [];

function setup() {
  if (window.innerWidth > window.innerHeight) {
    width = window.innerWidth;
    w = width / N;
    height = window.innerHeight - window.innerHeight % w;
  } else {
    height = window.innerHeight;
    w = height / N;
    width = window.innerWidth - window.innerWidth % w;
  }

  cols = floor(width / w);
  rows = floor(height / w);

  createCanvas(width, height);
  frameRate(16)

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j); 
      grid.push(cell);
    }
  }
  
  current = grid[0];
  
}

function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  
  // STEP 0 - Visit the current cell.
  current.visited = true;

  // STEP 1 - Randomly pick one of its neighbors, call it next.
  let next = current.checkNeighbors();
  if (next) {
    // STEP 2 - Push the current cell to the stack.
    stack.push(current);
    
    // STEP 3 - Remove their common wall (for both).
    removeWalls(current, next);
    
    // STEP 4 - Visit next, set current to next.
    next.visited = true;
    current = next
  } else if (stack.length > 0) {
    current = stack.pop();
  } else {
    noLoop();
  }

  for (let cell of stack) {
    // leave bread crumbs
    cell.highlight(0, 220, 200, 200);
  }
  current.highlight(200, 140, 220, 120);
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1; 
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  
  this.checkNeighbors = function() {
    let neighbors = [];
    
    let top     = grid[index(i, j-1)];
    let right   = grid[index(i+1, j)];
    let bottom  = grid[index(i, j+1)];
    let left    = grid[index(i-1, j)];
  
    if (top && !top.visited) {
      neighbors.push(top); 
    }
    if (right && !right.visited) {
      neighbors.push(right); 
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom); 
    }
    if (left && !left.visited) {
      neighbors.push(left); 
    }
    
    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
    console.log(this.walls)
  }
  
  this.highlight = function(r, g, b, a) {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(r, g, b, a);
    rect(x + w/4, y + w/4, w/2, w/2);
  }
  
  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    
    // TOP WALL
    push()
    strokeWeight(2)
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    // RIGHT WALL
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    // BOTTOM WALL
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    // LEFT WALL
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }
    pop()
    if (this.visited) {
      noStroke();
      fill(0, 255, 255, 80);
      rect(x, y, w, w);
    }
    
    
  }
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
