var startPoint = {
    oldPosition: -1,
    setPos: function (newPos) {
        if(this.oldPosition != -1) {
            gridContainer.querySelector("#" + this.oldPosition).style.backgroundColor = "white";
        }
        this.oldPosition = newPos
    }
}
var endPoint = Object.assign({}, startPoint)