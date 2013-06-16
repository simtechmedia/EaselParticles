class ParticleView {


    private stage   : any;                           // Stage

    private particleContainer ;                      // Particle Container

    // Model Reference
    private _model                  : ParticlesModel ;

    // Label for debug, will move this to a debug view
    private fpsLabel : createjs.Text;

    constructor() {

    }

    public init():void
    {
        console.log("partivleView Init");

        this.particleContainer = new createjs.Container();

        // add a text object to output the current FPS:
        // might move this into a debug view soon
        this.fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FFF");
        this.stage.addChild(this.fpsLabel);
        this.fpsLabel.x = 400;
        this.fpsLabel.y = 0;

        // start the tick and point it at the window so we can do some work before updating the stage:
        var _this = this;
        createjs.Ticker.addEventListener('tick', function():void {
            _this.tick();
        });

        createjs.Ticker.setFPS(60);

        // Create the emiters
        var emiter : Emiter = new Emiter(this.stage.canvas.width / 2 , this.stage.canvas.height / 2);
        this.stage.addChild(emiter);

    }

    public setStage( stage : any ) : void  {
        this.stage      = stage;
    }

    public setModel( model:ParticlesModel):void {
        this._model     = model;
    }

    /**
     * onTick Handler
     */
    private tick():void
    {
//        if(!this.stage) {
//            // If stage isn't ready, the tick is canceled
//            return;
//        }

        this.fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";
        this.stage.update();
    }
}