// Canvas variables.
// Map's variables.
var theMap;
var pathfinder;
var traversed;
var finished;
var solvable;
var numSteps;
// Buttons.
var depthFirstButton;
var breadthFirstButton;
var bestSearchButton;
var aStarButton;
var newButton;
/**
 * Sets up the canvas.
 */
function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    initComponents();
}
/**
 * Draws the canvas.
 */
function draw() {
    background(BLACK);
    update();
    theMap.show();
    showStepsTaken();
}
// Utility functions.
/**
 * Initializes the canvas.
 */
function initComponents() {
    theMap = new Map(ENTRANCE, EXIT);
    traversed = finished = solvable = false;
    numSteps = 0;
    depthFirstButton = createButton('Depth-first Search');
    depthFirstButton.position(width / 4.975, height / 30);
    depthFirstButton.mousePressed(() => {
        traverseBy(new DepthFirst(theMap));
    });
    breadthFirstButton = createButton('Breadth-first Search');
    breadthFirstButton.position(width / 2.75, height / 30);
    breadthFirstButton.mousePressed(() => {
        traverseBy(new BreadthFirst(theMap));
    });
    bestFirstButton = createButton('Best-first Search');
    bestFirstButton.position(width / 1.865, height / 30);
    bestFirstButton.mousePressed(() => {
        traverseBy(new BestFirst(theMap));
    });
    aStarButton = createButton('A* Search');
    aStarButton.position(width / 1.45, height / 30);
    aStarButton.mousePressed(() => {
        traverseBy(new AStar(theMap));
    });
    newButton = createButton('New Map');
    newButton.position(0.885 * width, height / 30);
    newButton.mousePressed(generateNewMap);
}
/**
 * Updates the canvas.
 */
function update() {
    if (solvable) {
        if (traversed && pathfinder.allPaths.length > 0) {
            for (var i = 0; i < 25; i++) {
                var index = pathfinder.allPaths.shift();
                if (index === theMap.exit) {
                    pathfinder.allPaths = [];
                    break;
                }
                theMap.cells[index].color = LIGHT_GRAY;
            }
        } else if (traversed && !finished && pathfinder.allPaths.length === 0) {
            finished = true;
        } else if (finished && pathfinder.path.length > 0) {
            for (var j = 0; j < 3 && pathfinder.path.length > 0; j++) {
                theMap.cells[pathfinder.path.pop()].color = BLUE;
                numSteps++;
                if (pathfinder.path.length === 0) {
                    numSteps--;
                }
            }
        }
    }
}
/**
 * Traverses the map until the exit is found.
 * @param {*} aPathfinder type of pathfinder
 */
function traverseBy(aPathfinder) {
    for (var i = 0; i < theMap.cells.length; i++) {
        if (isEntranceOrExit(i, theMap.entrance, theMap.exit)) {
            theMap.cells[i].color = (i === theMap.entrance) ? RED : GREEN;
        } else if (!theMap.cells[i].isWall) {
            theMap.cells[i].color = GRAY;
        }
    }
    pathfinder = aPathfinder;
    solvable = pathfinder.solve();
    traversed = true;
    finished = false;
    numSteps = 0;
}
/**
 * Generates a new map.
 */
function generateNewMap() {
    theMap = new Map(ENTRANCE, EXIT);
    pathfinder = null;
    traversed = finished = solvable = false;
    numSteps = 0;
}
/**
 * Shows the steps taken by the pathfinder.
 */
function showStepsTaken() {
    fill(WHITE);
    textSize(TEXT_SIZE);
    text("Steps taken: " + numSteps, width / 2 - width / 15, 0.97 * height);
}