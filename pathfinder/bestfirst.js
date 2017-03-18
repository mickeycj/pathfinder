/**
 * A Pathfinding object which uses Best-first search algorithm
 * to find the path between the map's entrance and exit.
 */
function BestFirst(aMap) {
    /**
     * Constructs a new pathfinder, based on Best-first search algorithm.
     */
    this.theMap = aMap;
    this.allPaths = [];
    this.path = [];
    /**
     * Solves the specified map, choosing the shortest possible path for each step.
     */
    this.solve = function() {
        var heuristics = [];
        var predecessors = [];
        for (var i = 0; i < this.theMap.cells.length; i++) {
            heuristics[i] = heuristic(this.theMap, i, this.theMap.exit);
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
                    predecessors[neighbor] = current;
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                        openSet.sort((a, b) => {
                            return heuristics[a] - heuristics[b];
                        });
                        this.allPaths.push(neighbor);
                    }
                }
            }, this);
        }
        return false;
    }; 
}