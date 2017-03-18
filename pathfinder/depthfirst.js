/**
 * A Pathfinding object which uses Depth-first search algorithm
 * to find the path between the map's entrance and exit.
 */
function DepthFirst(aMap) {
    /**
     * Constructs a new pathfinder, based on Depth-first search algorithm.
     */
    this.theMap = aMap;
    this.allPaths = [];
    this.path = [];
    /**
     * Solves the specified map randomly.
     */
    this.solve = function() {
        var visited = [];
        var predecessors = [];
        for (var i = 0; i < this.theMap.cells.length; i++) {
            visited[i] = i === this.theMap.entrance;
            predecessors[i] = -1;
        }
        var stack = [];
        stack.push(this.theMap.entrance);
        while (stack.length > 0) {
            var current = stack.pop();
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
            visited[current] = true;
            var neighbors = this.theMap.getNeighborsOf(current).reverse();
            neighbors.forEach((neighbor) => {
                if (!visited[neighbor]) {
                    predecessors[neighbor] = current;
                    stack.push(neighbor);
                    this.allPaths.push(neighbor);
                }
            }, this);
        }
        return false;
    };
}