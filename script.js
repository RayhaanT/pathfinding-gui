const runButton = document.querySelector("#run")
const startButton = document.querySelector("#placeStart")
const endButton = document.querySelector("#endStart")
const wallButton = document.querySelector("#wallButton")
const gridContainer = document.getElementById("gridContainer")

var boxSize = gridContainer.clientWidth/32

generateGrid(32, 5)

function generateGrid(width, height) {
    if(width <= 32) {
        gridContainer.style.width = width*boxSize + "px"
    } else {
        gridContainer.style.width = "80%"
        boxSize = Math.floor(gridContainer.clientWidth/width)
        gridContainer.style.width = boxSize*width + "px"
        console.log(boxSize)
    }
    let ratio = height / width
    gridContainer.style.height = boxSize*height+"px"

    for(x = 0; x < width; x++) {
        for(y = 0; y < height; y++) {
            const newBox = document.createElement('div');
            newBox.className = "box"
            newBox.style.width = boxSize + "px";
            newBox.style.height = boxSize + "px";
            gridContainer.appendChild(newBox);
        }
    }
}

window.onload = function(){
    
}