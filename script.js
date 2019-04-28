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

var boxSize = gridContainer.clientWidth/32

var boxColors = ["lightblue", "blue", "black", "red", "green", "white"]
var tool = -1

generateGrid(32, 18)

function generateGrid(width, height) {
    if(width <= 32) {
        gridContainer.style.width = width*boxSize + "px"
    } else {
        gridContainer.style.width = "80%"
        boxSize = Math.floor(gridContainer.clientWidth/width)
        gridContainer.style.width = boxSize*width + "px"
        console.log(boxSize)
    }
    gridContainer.style.height = boxSize*height+"px"

    for(x = 0; x < width; x++) {
        for(y = 0; y < height; y++) {
            createBox().id = x + " " + y
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
    fCost.className = "fCost"
    gCost.className = "gCost"
    hCost.className = "hCost"
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
	boxes = gridContainer.childNodes

	for(var i = 0; i < boxes.length; i++) {
		boxes[i].style.backgroundColor = "white"
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
    if(tool == -1) { //If no tool is selected
        return
    }
    
    if(tool == 0) {
    }
	
	this.style.backgroundColor = boxColors[tool]
}

function runAlgorithm() {

}