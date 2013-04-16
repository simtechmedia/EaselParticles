
var FPS = 60;

var canvas;
var stage;

var circleRadius=30;
var rings = 30;

var numOfParticles = 100;

var minLife = 2;
var maxLife = 5;

var minSize = 1;
var maxSize = 30;

var minSpeed = 1;
var maxSpeed = 5;

var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

var particleContainer ;

var mouse = new PVector(1,1);

var topSpeed = 4;

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

    for (var i=0; i < numOfParticles; i++) {
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
//    shape.velocity = new PVector(0,0);
    shape.velocity = new PVector(randomPrecision(minSpeed,maxSpeed,2)-maxSpeed/2,randomPrecision(minSpeed,maxSpeed,2)-maxSpeed/2);
    shape.location = new PVector( canvas.width / 2 , canvas.height / 2 );
    shape.acceleration = new PVector(0,0);

    shape.x = shape.location.x;
    shape.y = shape.location.y;

    shape.graphics.setStrokeStyle(2);
    shape.graphics.beginStroke("#000000");
    shape.graphics.beginFill("#f9a71f").drawCircle(1,1,circleRadius-2);

    shape.scaleX = shape.scaleY = randomFromInterval(minSize,maxSize)/20;
    shape.alpha = 1;
    shape.cache(-circleRadius, -circleRadius, circleRadius*2, circleRadius*2);              // Set Cache
    shape.snapToPixel = true;
    shape.ttl = shape.totallife = randomPrecision( minLife , maxLife , 2 ) * FPS;       //Init shape Time to live
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
    for (var i=0; i<l-1; i++)
    {
        var shape = particleContainer.getChildAt(i);
        if (typeof(shape.x) !== 'undefined')
        {
            // Mouse FOllow
            var dir = new PVector(0,0).subStatic( mouse , shape.location);
            dir.normalize(1);
            dir.multi(0.1);
            shape.acceleration = dir;
            shape.velocity.add(shape.acceleration);
            shape.velocity.limit(topSpeed);
            // End of mouse follow

            shape.location.add(shape.velocity);

            shape.x = shape.location.x;
            shape.y = shape.location.y;

            shape.alpha = shape.ttl / shape.totallife;
            shape.ttl--;
            if(shape.ttl < 1 ) {
                shape.remove = true;
            }
        }
    }
    // Do the Remove Afterwards
    for ( var i = l ; i > 0 ; i--)
    {
        var shape = particleContainer.getChildAt(i);
        if(shape.remove === true){
            shape.uncache();
            particleContainer.removeChild(shape);
        }
    }

    var currentNumberOfShapes = particleContainer.getNumChildren()-1;
    if( currentNumberOfShapes < numOfParticles )  {
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

function randomPrecision(lo, hi, prec){
    prec= Math.floor(Math.random()*(prec+1));
    return Number((lo+ Math.random()*(hi-lo+1)).toFixed(prec));
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

/**
 * Jquery Stuff to handle the UI
 */
$(function() {

    // Get Mouse Location
    $(document).mousemove(function(e){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });

    // Amount Slider
    $( "#slider-amount" ).slider({
        min: 1,
        max: 200,
        value: 100,
        slide: function( event, ui ) {
            $( "#partAmount" ).val( ui.value );
            numOfParticles = ui.value;

        }
    });
    $( "#partAmount" ).val( $( "#slider-amount" ).slider( "values", 0 ));

    // Size Slider
    $( "#slider-size" ).slider({
        range: true,
        min: 10,
        max: 50,
        values: [ minSize, maxSize ],
        slide: function( event, ui ) {
            $( "#partSize" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            minSize = ui.values[ 0 ];
            maxSize = ui.values[ 1 ];
        }
    });
    $( "#partSize" ).val( $( "#slider-size" ).slider( "values", 0 ) +
        " -" + $( "#slider-size" ).slider( "values", 1 ) );

    // Speed Slider
    $( "#slider-speed" ).slider({
        range: true,
        min: 1,
        max: 10,
        values: [ 1, 5 ],
        slide: function( event, ui ) {
            $( "#partSpeed" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            minSpeed = ui.values[ 0 ];
            maxSpeed = ui.values[ 1 ];
        }
    });
    $( "#partSpeed" ).val( $( "#slider-speed" ).slider( "values", 0 ) +
        " -" + $( "#slider-speed" ).slider( "values", 1 ) );
});
