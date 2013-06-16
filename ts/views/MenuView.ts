class MenuView {

    private container               : HTMLElement ;

    // Model Reference
    private _model                  : ParticlesModel ;

    // Sliders
    private particleAmountSlider    : JSlider ;             // Particle Output Amount
    private particleSizeSlider      : JSliderRange ;        // Particle Size Range
    private particleSpeedSlider     : JSliderRange ;        // Particle Speed Range
    private particleLifeSlider      : JSliderRange ;        // Particle Life Range
    private particleStrengthSlider  : JSlider ;

    // Output Boxes
    private particleAmountOutput    : JSliderOutput ;
    private particleSizeOuput       : JSliderOutput ;
    private particleSpeedOutput     : JSliderOutput ;
    private particleLifeOutput      : JSliderOutput ;
    private particleStrengthOutput  : JSliderOutput ;

    constructor( container ) {
        //super(container);
        this.container = container;
    }

    public init():void {
        console.log("menuView init");
        // Sliders

        this.particleAmountSlider = new JSlider({
            elementName : "#slider-amount" ,
            min         : 100 ,
            max         : 500 ,
            defaultNum  : this._model.getParticleAmount()
        });
        this.particleAmountSlider.onChangeSignal.add(this.onValueChange, this)
        this.particleAmountSlider.init();

        // Particle Size

        this.particleSizeSlider = new JSliderRange({
            elementName : "#slider-size" ,
            min         : this._model.getParticleSizeMin() ,
            max         : this._model.getParticleSizeMax() ,
            defaultNum  : 0,        // Not used
            low         : this._model.getParticleSizeLow(),
            high        : this._model.getParticleSizeHigh()
        });


        this.particleSizeSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleSizeSlider.init();

        // Particle Speed
        this.particleSpeedSlider = new JSliderRange({
            elementName : "#slider-speed" ,
            min         : this._model.getparticleSpeedMin() ,
            max         : this._model.getparticleSpeedMax() ,
            defaultNum  : 0,        // Not used
            low         : this._model.getparticleSpeedLow(),
            high        : this._model.getparticleSpeedHigh()
        });

        this.particleSpeedSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleSpeedSlider.init();

        // Particle Life
        this.particleLifeSlider = new JSliderRange({
            elementName : "#slider-life" ,
            min         : this._model.getparticleLifeMin() ,
            max         : this._model.getparticleLifeMax() ,
            defaultNum  : 0,        // Not used
            low         : this._model.getparticleLifeLow(),
            high        : this._model.getparticleLifeHigh()
        });

        this.particleLifeSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleLifeSlider.init();

        // Strength Slider
        this.particleStrengthSlider = new JSlider({
            elementName : "#slider-strength" ,
            min         : this._model.getparticleStrengthMin() ,
            max         : this._model.getparticleStrengthMax() ,
            defaultNum  : this._model.getparticleStrength()
        });
        this.particleStrengthSlider.onChangeSignal.add(this.onValueChange, this)
        this.particleStrengthSlider.init();

        // Output
        this.particleAmountOutput   = new JSliderOutput("#partAmount");
        this.particleSizeOuput      = new JSliderOutput("#partSize");
        this.particleSpeedOutput    = new JSliderOutput("#partSpeed");
        this.particleLifeOutput     = new JSliderOutput("#partLife");
        this.particleStrengthOutput = new JSliderOutput("#partStrength");

        // Manual Update once UI is inited
        this.onModelUpdate();
    }

    private onValueChange( elementName:String,  ...numbers : number[] ){
         switch(elementName) {
             case "#slider-amount":
                 this._model.setParticleAmount(numbers[0]);
                 break;
             case "#slider-size":
                 this._model.setParticleSizeLow(numbers[0][0]);
                 this._model.setParticleSizeHigh(numbers[0][1]);
                 break;
             case "#slider-speed":
                 this._model.setparticleSpeedLow(numbers[0][0]);
                 this._model.setparticleSpeedHigh(numbers[0][1]);
                 break;
             case "#slider-life":
                 this._model.setparticleLifeLow(numbers[0][0]);
                 this._model.setparticleLifeHigh(numbers[0][1]);
                 break;
             case "#slider-strength":
                 this._model.setparticleStrength(numbers[0]);
                 break;
         }
    }

    public setModel( model:ParticlesModel):void {
        this._model = model;
        this._model.modelUpdateSignal.add(this.onModelUpdate, this);
    }

    private onModelUpdate():void {
        this.particleAmountOutput.setValue(String(this._model.getParticleAmount()));
        this.particleSizeOuput.setValue(this._model.getParticleSizeLow() + " - " + this._model.getParticleSizeHigh());
        this.particleSpeedOutput.setValue(this._model.getparticleSpeedLow() + " - " + this._model.getparticleSpeedHigh());
        this.particleLifeOutput.setValue(this._model.getparticleLifeLow() + " - " + this._model.getparticleLifeHigh());
        this.particleStrengthOutput.setValue(String(this._model.getparticleStrength()));
    }
}
