var canvas;
var stage;
var shape;
var circleRadius=30;
var rings = 30;

var emitSpeed;

function init() {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    // create a new stage and point it at our canvas:
    canvas = document.getElementById("mainCanvas");
    stage = new createjs.Stage(canvas);
    window.addEventListener('resize', resize, false);

    // create a large number of slightly complex vector shapes, and give them random positions and velocities:

    var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

    for (var i=0; i<200; i++) {
        shape = new createjs.Shape();
        for (var j=rings; j>0; j--) {
            shape.graphics.beginFill(colors[Math.random()*colors.length |0]).drawCircle(0,0,circleRadius*j/rings);
        }
        shape.x = canvas.width / 2 ;
        shape.y = canvas.height / 2 ;
        shape.velX = Math.random()*10-5;
        shape.velY = Math.random()*10-5;
        shape.alpha = 1;

        // turn snapToPixel on for all shapes - it's set to false by default on Shape.
        // it won't do anything until stage.snapToPixelEnabled is set to true.
        shape.snapToPixel = true;

        stage.addChild(shape);

        resize();
    }

    // add a text object to output the current FPS:
    fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = 0;
    fpsLabel.y = 0;

    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);

    // Set Cache
    var l = stage.getNumChildren()-1;
    for (var i=0; i<l; i++) {
        var shape = stage.getChildAt(i);
        shape.cache(-circleRadius, -circleRadius, circleRadius*2, circleRadius*2);

    }
}

/**
 * onTick Handler
 */
function tick() {

    var w = canvas.width;
    var h = canvas.height;
    var l = stage.getNumChildren()-1;

    // iterate through all the children and move them according to their velocity:
    for (var i=1; i<l; i++) {
        var shape = stage.getChildAt(i);
        shape.x = (shape.x+shape.velX+w)%w;
        shape.y = (shape.y+shape.velY+h)%h;
        shape.alpha -= 0.005;
    }

    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";

    // draw the updates to stage:
    stage.update();
}


/**
 * Resize event handler
 */
function resize() {

    // Resize the canvas element
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    // Content: centered
    canvas.x = stage.canvas.width / 2;
    canvas.y = stage.canvas.height / 2;
}
