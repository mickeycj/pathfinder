/**
 * A Pathfinding object which uses Breadth-first search algorithm
 * to find the path between the map's entrance and exit.
 */
function BreadthFirst(aMap) {
    /**
     * Constructs a new pathfinder, based on Breadth-first search algorithm.
     */
    this.theMap = aMap;
    this.allPaths = [];
    this.path = [];
    /**
     * Solves the specified map, using the shortest path possible.
     */
    this.solve = function() {
        var visited = [];
        var predecessors = [];
        for (var i = 0; i < this.theMap.cells.length; i++) {
            visited[i] = i === this.theMap.entrance;
            predecessors[i] = -1;
        }
        var queue = [];
        queue.push(this.theMap.entrance);
        while (queue.length > 0) {
            var current = queue.shift();
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
            var neighbors = this.theMap.getNeighborsOf(current);
            neighbors.forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    predecessors[neighbor] = current;
                    queue.push(neighbor);
                    this.allPaths.push(neighbor);
                }
            }, this);
        }
        return false;
    };
}