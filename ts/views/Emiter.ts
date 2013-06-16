
class Emiter extends createjs.Shape{

    private _circleRadius : number  = 50;

    constructor( x : number , y : number ){
        super();

        this.graphics.setStrokeStyle(5);
        this.graphics.beginStroke("#000000");
        this.graphics.beginFill("#ffffff").drawCircle(1,1,this._circleRadius-2);
        this.x = x + this._circleRadius /2 ;
        this.y = y + this._circleRadius /2 ;
    }
}