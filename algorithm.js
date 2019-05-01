var startPoint = {
    position: -1,
    oldColor: null,
    setPos: function (newPos) {
        let newID = newPos.slice(1, newPos.length)
        let coords = newID.split("-")
        let newPosition = grid[coords[1]][coords[0]]
        if (this.position != -1) {
            this.position.boxDOM.style.backgroundColor = this.oldColor
        }
        this.position = newPosition     
        this.oldColor = this.position.boxDOM.style.backgroundColor   
    }
}
var endPoint = Object.assign({}, startPoint)

var grid = []
var gridPath = null

var node = {
    x: 0,
    y: 0,
    fCost: 0,
    gCost: 0,
    hCost: 0,
    boxDOM: null,
    parent: null,
    walkable: true
}

function getNeighbours(_node) {
    neighbours = []

    for (var y = -1; y <= 1; y++) {
        for (var x = -1; x <= 1; x++) {
            if (x == 0 && y == 0)
                continue;

            let checkX = _node.x + x;
            let checkY = _node.y + y;

            if (checkX >= 0 && checkX < grid[0].length && checkY >= 0 && checkY < grid.length) {
                neighbours.push(grid[checkY][checkX]);
            }
        }
    }
    return neighbours
}

function Update() {
    FindPath(startPoint.position, endPoint.position);
}

function remove(arr, value) {
    for( var i = 0; i < arr.length; i++){ 
        if ( arr[i] === value) {
          arr.splice(i, 1); 
        }
     }     
}

function FindPath(startNode, targetNode) {
    var openSet = []
    var closedSet = []
    openSet.push(startNode);

    while (openSet.length > 0) {
        let currentNode = openSet[0];
        for (var i = 1; i < openSet.length; i++) {
            if (openSet[i].fCost < currentNode.fCost || openSet[i].fCost == currentNode.fCost) {
                if (openSet[i].hCost < currentNode.hCost)
                    currentNode = openSet[i];
            }
        }        

        remove(openSet, currentNode)
        closedSet.push(currentNode)
        visualizeNode(currentNode, "red")

        if (currentNode == targetNode) {
            RetracePath(startNode, targetNode);
            for(var i = 0; i < gridPath.length; i++) {
                visualizeNode(gridPath[i], "green")
            }    
            visualizeNode(startNode, "green")
            return;
        }
        neighbours = getNeighbours(currentNode)
        for(var i = 0; i < neighbours.length;i++){
            let neighbour = neighbours[i]
            if (!neighbour.walkable || closedSet.includes(neighbour)) {
                continue;
            }

            let newCostToNeighbour = currentNode.gCost + GetDistance(currentNode, neighbour);
            if (newCostToNeighbour < neighbour.gCost || !openSet.includes(neighbour)) {                
                neighbour.gCost = newCostToNeighbour;
                neighbour.hCost = GetDistance(neighbour, targetNode);
                neighbour.fCost = neighbour.gCost + neighbour.hCost;
                neighbour.parent = currentNode;

                if (!openSet.includes(neighbour)) {
                    openSet.push(neighbour);
                    visualizeNode(neighbour, "red")
                }
            }
        }
    }

    console.log("ERROR")
}

function visualizeNode(_node, color) {    
    _node.boxDOM.querySelector("#gCost").innerHTML = _node.gCost;
    _node.boxDOM.querySelector("#hCost").innerHTML = _node.hCost;
    _node.boxDOM.querySelector("#fCost").innerHTML = _node.fCost;
    _node.boxDOM.style.backgroundColor = color;
}

function RetracePath(startNode, endNode) {
    let path = []
    let currentNode = endNode;

    while (currentNode != startNode) {
        path.push(currentNode);
        currentNode = currentNode.parent;
    }
    path.reverse();

    gridPath = path;
}

function GetDistance(nodeA, nodeB) {
    let dstX = Math.abs(nodeA.x - nodeB.x);
    let dstY = Math.abs(nodeA.y - nodeB.y);

    if (dstX > dstY)
        return 14 * dstY + 10 * (dstX - dstY);
    return 14 * dstX + 10 * (dstY - dstX);
}