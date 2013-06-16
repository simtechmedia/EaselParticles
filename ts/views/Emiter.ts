
class Emitter extends createjs.Shape{

    private _circleRadius : number  = 50;

    private _stage : any;

    constructor( x : number , y : number , stage : any ){
        super();

        this._stage = stage;

        this.graphics.setStrokeStyle(5);
        this.graphics.beginStroke("#000000");
        this.graphics.beginFill("#ffffff").drawCircle(1,1,this._circleRadius-2);
        this.x = x + this._circleRadius /2 ;
        this.y = y + this._circleRadius /2 ;

        console.log("Emiter")
        console.log(this)

        var _this : Emitter = this;

        this.addEventListener('mousedown', function(evt) {
            _this.onMousePress(evt);
        });

        this.addEventListener('mouseover', function(evt) {
            _this.onMouseOver(evt);
        });

        this.addEventListener('mouseout', function(evt) {
            _this.onMouseOut(evt);
        });

    }

    onMousePress(evt):void
    {
        console.log("onMousePress");
        console.log(this);

//        // bump the target in front of it's siblings:
//        this._stage.addChild(this);
//        var offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
//
//        // add a handler to the event object's onMouseMove callback
//        // this will be active until the user releases the mouse button:
//        evt.onMouseMove = function(ev) {
//
//            console.log("moseMove")
//            this.x = ev.stageX+offset.x;
//            this.y = ev.stageY+offset.y;
//            // indicate that the stage should be updated on the next tick:
//            //update = true;
//        }
    }

    onMouseOver(evt):void
    {
        console.log("mouseOver")
        this.scaleX = this.scaleY = 1.2;
    }

    onMouseOut(evt):void
    {
        console.log("mouseOut")
        this.scaleX = this.scaleY = 1.0;
    }
}