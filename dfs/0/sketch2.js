var cols, rows;
var w = 10;
var grid = [];
var currents = [];
var stacks = [[]];

function setup()
{
    createCanvas(500, 500);
    cols = floor(width/w);
    rows = floor(height/w);
    
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            grid.push(new Cell(i, j));
        }
    }

    currents.push(grid[0]);
    currents.push(grid[cols-1]);
    currents.push(grid[cols*rows-cols]);
    currents.push(grid[grid.length-1]);

    var stack = [];
    stacks.push(stack);
    var stack = [];
    stacks.push(stack);
    var stack = [];
    stacks.push(stack);
    var stack = [];
    stacks.push(stack);

    console.log(currents);
}
function draw() {
    background(55);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    for (var i = 0; i < currents.length; i++) {
    
        currents[i].visited = true;
        currents[i].highlight();
        var next = currents[i].checkNeighbours();

        if (next) {
            next.visited = true;

            stacks[i].push(currents[i]);

            removeWalls(currents[i], next);;
            currents[i] = next;
        } else if (stacks[i].length > 0) {
            currents[i].backtracked = true;
            currents[i] = stacks[i].pop();
        }
    }
}

function index(i, j){
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1 ) {
        return -1;
    }
    return i + j * cols;
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

// CELL CLASS

function Cell(i, j) {
    this.i = i;
    this.j = j;

    this.walls = [true, true, true, true];
    this.visited = false;
    this.backtracked = false;

    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;
        stroke(255);

        //top left - right
        if (this.walls[0]){
            line(x, y, x+w, y);
        }
        //right top - bottom
        if (this.walls[1]){
            line(x+w, y+w, x+w, y+w);
        }
        //bottom right - left
        if (this.walls[2]){
            line(x, y+w, x+w, y+w);
        }
        //left top - bottom
        if (this.walls[3]){
            line(x, y, x, y+w);
        }

        if (this.visited) {
            noStroke();
            fill(0, 100, 250, 100);
            rect(x, y, w, w);
        } 

        if (this.backtracked) {
            noStroke();
            fill(250, 250, 250, 100);
            rect(x, y, w, w);
        } 
    }

    this.highlight = function() {
        var x = this.i*w;
        var y = this.j*w;
        noStroke();
        fill(255, 121, 0, 200);
        rect(x, y, w, w);
    }    

    this.checkNeighbours = function() {
        var neighbours = [];

        var top = grid[index(i, j-1)];
        var right = grid[index(i+1, j)];
        var bottom = grid[index(i, j+1)];
        var left = grid[index(i-1, j)];

        if (top && !top.visited) {
            neighbours.push(top);
        }
        if (right && !right.visited) {
            neighbours.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && !left.visited) {
            neighbours.push(left);
        }

        if (neighbours.length > 0) {
            var r = floor(random(0, neighbours.length));
            return neighbours[r];
        } else {
            return undefined;
        }
    }
}