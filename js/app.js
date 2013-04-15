
var FPS = 60;

var canvas;
var stage;
var shape;
var circleRadius=30;
var rings = 30;

var numOfParticles = 100;

var minLife = 2;
var maxLife = 5;

var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

var particleContainer ;

function init() {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    // create a new stage and point it at our canvas:
    canvas = document.getElementById("mainCanvas");
    stage = new createjs.Stage(canvas);
    window.addEventListener('resize', resize, false);
    resize();

    particleContainer = new createjs.Container();
    stage.addChild(particleContainer);


    for (var i=0; i<numOfParticles; i++) {
        createParticle();
    }

    // add a text object to output the current FPS:
    fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = 0;
    fpsLabel.y = 0;

    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(FPS);

}

/**
 * Creates particle using varibles defined
 */
function createParticle()
{
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#f9a71f").drawCircle(0,0,circleRadius);
    shape.x = canvas.width / 2 ;
    shape.y = canvas.height / 2 ;
    shape.velX = Math.random()*10-5;
    shape.velY = Math.random()*10-5;
    shape.alpha = 1;
    shape.cache(-circleRadius, -circleRadius, circleRadius*2, circleRadius*2);              // Set Cache
    shape.snapToPixel = true;
    shape.ttl = shape.totallife = randomFromInterval( minLife , maxLife ) * FPS;       //Init shape Time to live
    particleContainer.addChild(shape);
}

/**
 * onTick Handler
 */
function tick()
{
    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";
    var w = canvas.width;
    var h = canvas.height;
    var l = particleContainer.getNumChildren()-1;
    // iterate through all the children and move them according to their velocity:
    for (var i=0; i<l; i++) {
        var shape = particleContainer.getChildAt(i);
        if('ttl' in shape )               // Make sure it's a Shape
        {
            shape.x = (shape.x+shape.velX+w)%w;
            shape.y = (shape.y+shape.velY+h)%h;
            shape.alpha = shape.ttl / shape.totallife;
            shape.ttl--;
            if(shape.ttl < 1 ) {
                particleContainer.removeChild(shape);
                shape = null;
            }
        }
    }
    var currentNumberOfShapes = stage.getNumChildren()-1;
    if( currentNumberOfShapes < numOfParticles )
    {
        var neededNumber = numOfParticles - currentNumberOfShapes;
        for (var i = 0; i < neededNumber ; i++) {
            createParticle();
        }
    }
    stage.update();
}

/*
 Creates a Random Number Between two numbers
 */
function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
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
