/**
 * A Cell object containing its coordinate on the map.
 */
function Cell(index, color, isWall) {
    /**
     * Constructs a new cell with the specified index, color, and wall status.
     */
    this.x = Math.floor(index % NUM_COLS) * CELL_SIZE + X_OFFSET;
    this.y = Math.floor(index / NUM_COLS) * CELL_SIZE + Y_OFFSET;
    this.color = color;
    this.isWall = isWall;
    /**
     * Shows this cell on the map.
     */
    this.show = function() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
    };
}
// Utility function.
/**
 * Returns the cell index of this xy-coordinate.
 * @param {*} x x-coordinate
 * @param {*} y y-coordinate
 */
function indexOf(x, y) {
    if (x < 0 || x > NUM_COLS-1 || y < 0 || y > NUM_ROWS-1) {
        return -1;
    }
    return x + y * NUM_COLS;
}