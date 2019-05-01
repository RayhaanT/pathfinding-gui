const runButton = document.querySelector("#run")
const startButton = document.querySelector("#placeStart")
const endButton = document.querySelector("#placeEnd")
const wallButton = document.querySelector("#placeWalls")
const removeButton = document.querySelector("#removeWalls")
const clearButton = document.querySelector("#clear")
const dimensionsButton = document.querySelector("#dimensions")
const gridContainer = document.getElementById("gridContainer")
runButton.addEventListener('click', runAlgorithm)
startButton.addEventListener('click', setStart)
endButton.addEventListener('click', setEnd)
wallButton.addEventListener('click', placeWall)
removeButton.addEventListener('click', removeWall)
clearButton.addEventListener('click', clear)
dimensionsButton.addEventListener('click', setDimensions)

var boxSize
var width = 32;

var boxColors = ["lightblue", "blue", "black", "red", "green", "white"]
var tool = -1

generateGrid(32, 18)

function generateGrid(_width, height) {
    width = _width
    if(width <= 32) {
        boxSize = gridContainer.clientWidth/32
        gridContainer.style.width = width*boxSize + "px"
    } else {
        gridContainer.style.width = "80%"
        boxSize = Math.floor(gridContainer.clientWidth/width)
        gridContainer.style.width = boxSize*width + "px"
    }
    gridContainer.style.height = boxSize*height+"px"

    for(y = 0; y < height; y++) {
        grid.push([])
        for(x = 0; x < width; x++) {
            let newNode = Object.assign({}, node)
            newNode.boxDOM = createBox()
            newNode.boxDOM.id = "i" + x + "-" + y
            newNode.x = x
            newNode.y = y
            grid[y].push(newNode)
        }
    }
}

function createBox() {
    const newBox = document.createElement('div');
    newBox.addEventListener('mouseover', setAttribute)
    newBox.addEventListener('mousedown', setAttribute)
    newBox.className = "box"
    newBox.style.width = boxSize + "px";
    newBox.style.height = boxSize + "px";
    gridContainer.appendChild(newBox);
    let fCost = document.createElement('p')
    let gCost = document.createElement('p')
    let hCost = document.createElement('p')
    fCost.className = "fCost"; fCost.id = "fCost"
    gCost.className = "gCost"; gCost.id = "gCost"
    hCost.className = "hCost"; hCost.id = "hCost"
    newBox.appendChild(fCost)
    newBox.appendChild(gCost)
    newBox.appendChild(hCost)
    return newBox
}

function setStart() {
	tool = 0
}

function setEnd() {
	tool = 1
}

function placeWall() {
	tool = 2
}

function removeWall() {
	tool = 5
}

function clear() {
    //Reset colours
	boxes = gridContainer.childNodes
	for(var i = 0; i < boxes.length; i++) {
		boxes[i].style.backgroundColor = "white"
    }
    
    //Reset algo data
    startPoint.position = -1
    endPoint.position = -1
    
    for(var y = 0; y < grid.length; y++) {
        for(var x = 0; x < grid[0].length; x++) {            
            grid[y][x].walkable = true
            grid[y][x].boxDOM.querySelector("#fCost").innerHTML = "";
            grid[y][x].boxDOM.querySelector("#gCost").innerHTML = "";
            grid[y][x].boxDOM.querySelector("#hCost").innerHTML = "";
        } 
    }
}

function setDimensions() {
    let newDimensions = prompt("Enter the new dimensions seperated by a space", "32 18")
    let width
    let height
    let strData = ""
    for(var i = 0; i < newDimensions.length; i++) {
        strData+=newDimensions[i]
        if(newDimensions[i] == ' ') {
            width = parseInt(strData, 10)
            strData = ""
        }
    }
    height = parseInt(strData, 10)
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    }
    generateGrid(width, height)
}

function setAttribute(evt) {
	if(evt.buttons != 1 && evt.buttons != 3) { //If no button is clicked on hover
		return
	}
    if(tool == -1) { return; } //If no tool is selected 
    if(tool == 0) { //If start position
        startPoint.setPos(this.id)
    }
    if(tool == 1) { //If end position
        endPoint.setPos(this.id)
    }
    if(tool == 2) {
        let id = this.id
        newID = id.slice(1, id.length)
        let coords = newID.split("-")
        grid[coords[1]][coords[0]].walkable = false;
    }
    if(tool == 5) {
        let id = this.id
        newID = id.slice(1, id.length)
        let coords = newID.split("-")
        grid[coords[1]][coords[0]].walkable = true;
    }
    
    if(tool != 5) { //If not remove wall
        this.style.backgroundColor = boxColors[tool]
    } else {
        if(this.style.backgroundColor == "black") {
            this.style.backgroundColor = boxColors[tool]
        }
    }
}

function runAlgorithm() {
    if(startPoint.position == -1) {
        alert("No start point is selected"); return;
    }
    if(endPoint.position == -1) {
        alert("No end point is selected"); return;
    }
    
    FindPath(startPoint.position, endPoint.position)
}