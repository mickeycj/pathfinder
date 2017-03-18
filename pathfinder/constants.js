// Canvas constants.
// Screen's dimension.
var SCREEN_WIDTH = Math.floor(screen.availWidth * 0.987701778);
var SCREEN_HEIGHT = Math.floor(screen.availHeight * 0.880376344);
var TEXT_SIZE = SCREEN_WIDTH / 50;
// Colors.
var BLACK = [0, 0, 0];
var GRAY = [128, 128, 128];
var LIGHT_GRAY = [179, 179, 179];
var WHITE = [255, 255, 255];
var RED = [179, 0, 0];
var GREEN = [0, 179, 0];
var BLUE = [0, 0, 179];
// Map and cells constants.
var CELL_SIZE = Math.floor(SCREEN_HEIGHT / 40);
var NUM_ROWS = Math.floor(SCREEN_HEIGHT / CELL_SIZE);
var NUM_COLS = Math.floor(SCREEN_WIDTH / CELL_SIZE);
var NUM_CELLS = Math.floor(NUM_ROWS * NUM_COLS);
var X_OFFSET = Math.floor((SCREEN_WIDTH - CELL_SIZE * NUM_COLS) / 2);
var Y_OFFSET = Math.floor((SCREEN_HEIGHT - CELL_SIZE * NUM_ROWS) / 2);
var ENTRANCE = Math.floor(NUM_ROWS / 2) * NUM_COLS + 2;
var EXIT = ENTRANCE + NUM_COLS - 5;
var WALL_CHANCE = 0.3;