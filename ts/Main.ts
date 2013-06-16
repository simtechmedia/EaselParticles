// Libraries
///<reference path="org/opus/signals/Signal.ts" />
///<reference path="org/opus/signals/SignalBinding.ts" />
///<reference path="libs/jquery.d.ts" />
///<reference path="libs/jqueryui.d.ts" />
///<reference path="libs/easeljs.d.ts" />

// Model
///<reference path="models/ParticlesModel.ts" />

// View
///<reference path="views/MenuView.ts" />
///<reference path="views/ParticleView.ts" />
///<reference path="views/StageView.ts" />
///<reference path="views/comps/JSlider.ts" />
///<reference path="views/comps/JSliderRange.ts" />
///<reference path="views/comps/JSliderOutput.ts" />
///<reference path="views/Emiter.ts" />

class EaselParticlesContainer {

    private container       : HTMLElement;
    private particleModel   : ParticlesModel;    // Main Model
    private menuView        : MenuView;          // Contains the Menu Mediators
    private particleView    : ParticleView;
    private stageView       : StageView;        //

    /**
     * Constructor
     * @param container
     */
    constructor( container : HTMLElement )  {

        console.log("started22");
         this.container      = container;
        // Model
        this.particleModel  = new ParticlesModel();
        // Create New Menu View

        this.menuView       = new MenuView(this.container);
        this.menuView.setModel(this.particleModel);
        this.menuView.init();

        // Stage Views handles keyboard listeners and resizes etc
        this.stageView       = new StageView(this.container);
        this.stageView.init();

        this.particleView   = new ParticleView();
        this.particleView.setStage(this.stageView.getStage())   // Gets it's container from here
        this.particleView.setModel(this.particleModel);
        this.particleView.init();


     }
}