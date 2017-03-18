/**
 * A Pathfinding object which uses A* search algorithm
 * to find the path between the map's entrance and exit.
 */
function AStar(aMap) {
    /**
     * Constructs a new pathfinder, based on A* search algorithm.
     */
    this.theMap = aMap;
    this.allPaths = [];
    this.path = [];
    /**
     * Solves the specified map, taking heuristics into account.
     */
    this.solve = function() {
        var hScores = [];
        var gScores = [];
        var fScores = [];
        var predecessors = [];
        for (var i = 0; i < this.theMap.cells.length; i++) {
            hScores[i] = heuristic(this.theMap, i, this.theMap.exit);
            gScores[i] = (i === this.theMap.entrance) ? 0 : Number.MAX_SAFE_INTEGER;
            fScores[i] = (i === this.theMap.entrance) ? hScores[i] : Number.MAX_SAFE_INTEGER;
            predecessors[i] = -1;
        }
        var closedSet = [];
        var openSet = [];
        openSet.push(this.theMap.entrance);
        while (openSet.length > 0) {
            var current = openSet.shift();
            if (current === this.theMap.exit) {
                var index = this.theMap.exit;
                this.path.push(this.theMap.exit);
                while (predecessors[index] != -1) {
                    this.path.push(predecessors[index]);
                    index = predecessors[index];
                }
                this.allPaths.push(current);
                return true;
            }
            closedSet.push(current);
            var neighbors = this.theMap.getNeighborsOf(current);
            neighbors.forEach((neighbor) => {
                if (!closedSet.includes(neighbor)) {
                    var tentativeGScore = gScores[current] + 1;
                    if (tentativeGScore < gScores[neighbor]) {
                        gScores[neighbor] = tentativeGScore;
                        fScores[neighbor] = gScores[neighbor] + hScores[neighbor];
                        predecessors[neighbor] = current;
                        if (!openSet.includes(neighbor)) {
                            openSet.push(neighbor);
                            openSet.sort((a ,b) => {
                                return fScores[a] - fScores[b];
                            });
                            this.allPaths.push(neighbor);
                        }
                    }
                }
            }, this);
        }
        return false;
    };
}