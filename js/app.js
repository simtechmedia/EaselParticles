var FPS = 60;

var canvas;                             // Canvas
var stage;                              // Stage
var particleContainer ;                 // Particle Container

// Base Variables

var circleRadius=50;
var numOfParticles = 250;
var minLife =   2;
var maxLife =   5;
var minSize =   1;
var maxSize =   30;
var minSpeed =  1;
var maxSpeed =  5;
var topSpeed =  4;
var strength =  1

var x0  = -148;
var x1  = 176;

var y0  = 121;
var y1  = 350;

var baseShape;                          // Base Shape of particles, the ones on the stage just cloen this one

var w ;                                 // Current Width of Canvas
var h ;                                 // Current Height of Canvas

var emiter;                             // Main Emitter, might add more than one later
var subtractorAr = new Array();         // Array to hold negative forces
var particles = new Array();

var life_alpha = false;
var life_size  = true;

var playing = true;

function init() {
    /*
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }
    // create a new stage and point it at our canvas:
    canvas = document.getElementById("mainCanvas");
    stage = new createjs.Stage(canvas);
    //window.addEventListener('resize', resize, false);
    //resize();

    // Make a Seperate Container for the particles, makes it easier to manage
    particleContainer = new createjs.Container();
    stage.addChild(particleContainer);    

    createEmiter();     // Creates Emitter
    createSubtractor(650, 200);
    createSubtractor(500, 400);

    // Create the base particle for the rest of the particles
    baseShape = new createjs.Shape();
    baseShape.graphics.setStrokeStyle(2);
    baseShape.graphics.beginStroke("#000000");
    baseShape.graphics.beginFill("#f9a71f").drawCircle(1,1,circleRadius-2);
    baseShape.cache(-circleRadius, -circleRadius, circleRadius*2, circleRadius*2);              // Set Cache

    //
    for (var i = 0; i < numOfParticles ; i++) {
        createParticle();
    }

    // add a text object to output the current FPS:
    fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = 0;
    fpsLabel.y = 0;

    // My console log
    consoleLabel = new createjs.Text("","bold 18px Arial","#FFF");
    stage.addChild(consoleLabel);
    consoleLabel.x = 100;
    consoleLabel.y = 0;

    // start the tick and point it at the window so we can do some work before updating the stage:
    //createjs.Ticker.addEventListener("tick", tick);
    //createjs.Ticker.setFPS(FPS);
    */
}


function removeAllSubtractors()
{
    for (var i = subtractorAr.length - 1  ; i >= 0 ; i--)
    {
        var subtractor = subtractorAr[i];
        removeSub(subtractor);
    }
}

function removeSub(subtractor)
{
    subtractor.uncache();
    stage.removeChild(subtractor);
    subtractorAr.splice(subtractorAr.length - 1,1);
}

function createSubtractor(x, y)
{
    var subtractor = new createjs.Shape();
    subtractor.graphics.setStrokeStyle(5);
    subtractor.graphics.beginStroke("#ffffff");
    subtractor.graphics.beginFill("#000000").drawCircle(1,1,circleRadius-2);
    subtractor.x = x ;
    subtractor.y = y ;
    stage.addChild(subtractor);
    subtractorAr.push(subtractor);

    (function(target) {
        subtractor.onPress = function(evt) {
            // bump the target in front of it's siblings:
            stage.addChild(target);
            var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

            // add a handler to the event object's onMouseMove callback
            // this will be active until the user releases the mouse button:
            evt.onMouseMove = function(ev) {
                target.x = ev.stageX+offset.x;
                target.y = ev.stageY+offset.y;
                // indicate that the stage should be updated on the next tick:
                update = true;
            }
        }
        subtractor.onMouseOver = function() {
            target.scaleX = target.scaleY = target.scale*1.2;
            update = true;
        }
        subtractor.onMouseOut = function() {
            target.scaleX = target.scaleY = target.scale;
            update = true;
        }
    })(subtractor);

    return subtractor;
}

function createEmiter()
{
    // Create Emitter
    emiter = new createjs.Shape();
    emiter.graphics.setStrokeStyle(5);
    emiter.graphics.beginStroke("#000000");
    emiter.graphics.beginFill("#ffffff").drawCircle(1,1,circleRadius-2);
    emiter.x = w / 2 + circleRadius /2 ;
    emiter.y = h / 2 + circleRadius /2 ;
    stage.addChild(emiter);

    (function(target) {
        emiter.onPress = function(evt) {
            // bump the target in front of it's siblings:
            stage.addChild(target);
            var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

            // add a handler to the event object's onMouseMove callback
            // this will be active until the user releases the mouse button:
            evt.onMouseMove = function(ev) {
                target.x = ev.stageX+offset.x;
                target.y = ev.stageY+offset.y;
                // indicate that the stage should be updated on the next tick:
                update = true;
            }
        }
        emiter.onMouseOver = function() {
            target.scaleX = target.scaleY = target.scale*1.2;
            update = true;
        }
        emiter.onMouseOut = function() {
            target.scaleX = target.scaleY = target.scale;
            update = true;
        }
    })(emiter);
}

/**
 * Creates particle using varibles defined
 */
function createParticle()
{
    var particle        = new createjs.Bitmap(baseShape.cacheCanvas);
    particle.initScale  = randomFromInterval(minSize,maxSize) / 20;                         // FOr the Scale thing
    particle.scaleX     = particle.scaleY   = particle.initScale                            // Scale'
    particle.regX       = particle.regY     = - particle.width ;                            // Haven't got this to work yet
    particle.remove     = false;        // Init Value
    // Super Expensive
    var randomFilter = new createjs.ColorFilter(randomPrecision(0,1,2),randomPrecision(0,1,2),randomPrecision(0,1,2),1);
    particle.filters = [randomFilter];
    particle.cache( 0 , 0, circleRadius*2, circleRadius*2);              // Set Cache

    // Vector Speeds
    particle.velocity   = new PVector(randomPrecision(minSpeed,maxSpeed,2)-maxSpeed/2,randomPrecision(minSpeed,maxSpeed,2)-maxSpeed/2);
    particle.location   = new PVector( emiter.x - circleRadius / 2  , emiter.y - circleRadius / 2 );
    particle.acceleration = new PVector(0,0);

    // Move According to Vector
    particle.x = particle.location.x - ( circleRadius / 2 ) * particle.scaleY ;
    particle.y = particle.location.y - ( circleRadius / 2 ) * particle.scaleY ;

    particle.alpha = 1;
    particle.snapToPixel = true;
    particle.ttl = particle.totallife = randomPrecision( minLife , maxLife , 2 ) * FPS;           //Init shape Time to live
    particleContainer.addChild(particle);

    particles.push(particle);

}

/**
 * onTick Handler
 */
function tick()
{
    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";
    for (var i = 0 ; i < particles.length ; i++)
    {
        var shape = particles[i];
        for (var j = 0; j < subtractorAr.length; j++) {
            var element = subtractorAr[j];
            var dir = new PVector(0,0).subStatic( new PVector( element.x , element.y ) , shape.location);
            dir.normalize(1);
            dir.multi(strength / 10 );
            shape.acceleration = dir;
            shape.velocity.add(shape.acceleration);
        }
        // Adding Forces to Particle
        shape.velocity.limit(topSpeed);
        shape.location.add(shape.velocity);
        // Check Edges
        if (shape.location.x > stage.canvas.width ) {
            shape.location.x = 0;
        } else if ( shape.location.x < 0) {
            shape.location.x = stage.canvas.width;
        }
        if (shape.location.y > stage.canvas.height ) {
            shape.location.y = 0;
        }  else if ( shape.location.y < 0) {
            shape.location.y = stage.canvas.height;
        }
        // Showing Particle Relative the location VEctor
        shape.x = shape.location.x;
        shape.y = shape.location.y;
        // Alpha according to it's lie span
        //
        if(life_alpha === true ) {
            shape.alpha = shape.ttl / shape.totallife;
        }

        if(life_size === true ) {
            shape.scaleX = shape.scaleY = shape.initScale * ( shape.ttl / shape.totallife );
        }
        shape.ttl--;
        if(shape.ttl < 1 ) {
            shape.remove = true;
        }
    }
    // Do the Remove Afterwards
    for (var i = particles.length - 1  ; i >= 0 ; i--)
    {
        var shape = particles[i];
        if(shape.remove === true){
            shape.uncache();
            particleContainer.removeChild(shape);
            particles.splice(i,1);
        }
    }

    // Creates More if needed
    if( particles.length < numOfParticles )  {
        var neededNumber = numOfParticles - particles.length;
        for (var i = 0; i < neededNumber ; i++) {
            createParticle();
        }
    }

    //if(playing)stage.update();


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

function resize() {
    // Resize the canvas element
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    w = canvas.width;
    h = canvas.height;

    // Content: centered
    //canvas.x = stage.canvas.width / 2;
    canvas.y = stage.canvas.height / 2;
}
 */
/**
 * Jquery Stuff to handle the UI
 */
$(function() {
    // Amount Slider
    /*
    $( "#slider-amount" ).slider({
        min: 100,
        max: 500,
        value: numOfParticles,
        slide: function( event, ui ) {
            $( "#partAmount" ).val( ui.value );
            numOfParticles = ui.value;
        }
    });
    $( "#partAmount" ).val( $( "#slider-amount" ).slider( "values", 0 ))

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

     ;

    // Life Slider
    $( "#slider-life" ).slider({
        range: true,
        min: 1,
        max: 15,
        values: [ minLife, maxLife ],
        slide: function( event, ui ) {
            $( "#partLife" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            minLife = ui.values[ 0 ];
            maxLife = ui.values[ 1 ];
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

    // Speed strength
    $( "#slider-strength" ).slider({
        min: 1,
        max: 10,
        value: strength ,
        slide: function( event, ui ) {
            $( "#attrStrengh" ).val( ui.value );
            strength = ui.value ;
        }
    })
    $( "#attrStrengh" ).val( $( "#slider-strength" ).slider( "values", 0 ));

     */

    // Hide Menu control
    $(".openmenu").click(function(){
        //$(this).parent().parent().children(".tools").slideToggle();
    });


    $("#check_alpha").change(function(){
        life_alpha = $(this).prop('checked');
    });

    $("#check_size").change(function(){
        life_size = $(this).prop('checked');
    });

    // Uniform And Style Form
    $("input").uniform();

    // According
    $( "#accordion" ).accordion();

    // Key Shortcuts
    $(document).keydown(function(e) {
    switch (e.keyCode) {
        // A -  Hide UI
        case 72:
         $( "#accordion" ).toggle();
         break;
        // P -  Pause / Resume
        case 80:
            if (playing != false){
                playing = false ;
                createjs.Ticker.setPaused(true);
                createjs.Ticker.removeEventListener("tick", tick);
            }else{
                playing = true ;
                createjs.Ticker.setPaused(false);
                createjs.Ticker.addEventListener("tick", tick);
            }
            break;
        // A - Hide / Show Forces
        case 65:
            if (emiter.visible === true) {
                emiter.visible = false;
                for (var j = 0; j < subtractorAr.length; j++) {
                    var element = subtractorAr[j];
                    element.alpha = 0;
                }
            }else{
                emiter.visible = true;
                for (var j = 0; j < subtractorAr.length; j++) {
                    var element = subtractorAr[j];
                    element.alpha = 1;
                }
            }
            break;
        // F - show FPS
        case 70:
            if(fpsLabel.visible === true) {
                fpsLabel.visible = false;
            } else {
                fpsLabel.visible = true;
            }
            break;
        // L - Leap
        case 76:
            break;
        }
    });

});
