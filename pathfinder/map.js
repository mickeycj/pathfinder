/**
 * A Map object containing an array of cells, which can either be paths or walls.
 */
function Map(entrance, exit) {
    /**
     * Constructs a new map, with an initialized array of cells.
     */
    this.entrance = entrance;
    this.exit = exit;
    this.cells = [];
    for (var i = 0; i < NUM_CELLS; i++) {
        if (isEntranceOrExit(i, entrance, exit)) {
            this.cells[i] = new Cell(i, ((i === entrance) ? RED : GREEN), false);
        } else if (isBound(i) || random() < WALL_CHANCE) {
            this.cells[i] = new Cell(i, BLACK, true);
        } else {
            this.cells[i] = new Cell(i, GRAY, false);
        }
    }
    /**
     * Returns the indices of the neighboring cells of the specified cell.
     */
    this.getNeighborsOf = function(index) {
        var neighbors = [];
        var i = Math.floor(this.cells[index].x / CELL_SIZE);
        var j = Math.floor(this.cells[index].y / CELL_SIZE);
        if (!this.cells[indexOf(i+1, j)].isWall) {
            neighbors.push(indexOf(i+1, j));
        }
        if (!this.cells[indexOf(i, j-1)].isWall) {
            neighbors.push(indexOf(i, j-1));
        }
        if (!this.cells[indexOf(i, j+1)].isWall) {
            neighbors.push(indexOf(i, j+1));
        }
        if (!this.cells[indexOf(i-1, j)].isWall) {
            neighbors.push(indexOf(i-1, j));
        }
        return neighbors;
    };
    /**
     * Shows the map on the canvas.
     */
    this.show = function() {
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].show();
        }
    };
}
// Utility functions.
/**
 * Returns true if the specified cell is the entrance or exit.
 * @param {*} index index of the specified cell
 * @param {*} entrance index of the entrance
 * @param {*} exit index of the exit
 */
function isEntranceOrExit(index, entrance, exit) {
    return index === entrance || index === exit;
}
/**
 * Returns true if the specified must act as a bound of this map.
 * @param {*} index index of the specified cell
 */
function isBound(index) {
    var verticalBound = index < 3 * NUM_COLS || index > NUM_CELLS - 3 * NUM_COLS;
    var horizontalBound = index % NUM_COLS < 3 || index % NUM_COLS >= NUM_COLS - 3;
    return verticalBound || horizontalBound;
}
/**
 * Calculates the heuristic cost between two cells within the specified map.
 * @param {*} theMap the map
 * @param {*} a the first cell
 * @param {*} b the second cell
 */
function heuristic(theMap, a, b) {
    var x1 = Math.floor(theMap.cells[a].x / CELL_SIZE);
    var y1 = Math.floor(theMap.cells[a].y / CELL_SIZE);
    var x2 = Math.floor(theMap.cells[b].x / CELL_SIZE);
    var y2 = Math.floor(theMap.cells[b].y / CELL_SIZE);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}