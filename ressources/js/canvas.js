var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = 5;
    this.vy = 5;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function updateController(event) {

    if (event.key === "z") {
        myGamePiece.y -= myGamePiece.vy;
    }
    if (event.key === "q") {
        myGamePiece.x -= myGamePiece.vx;
    }
    if (event.key === "s") {
        myGamePiece.y += myGamePiece.vy;
    }
    if (event.key === "d") {
        myGamePiece.x += myGamePiece.vx;
    }
    updateGameArea();
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.update();
}