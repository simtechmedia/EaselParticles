class ParticlesModel {

    public modelUpdateSignal    : Signal = new Signal();


    constructor() {

    }

    private _particleAmount     : Number = 250;            // Number of particles on the screen at once
    public getParticleAmount():Number { return this._particleAmount;}
    public setParticleAmount(val:Number) {
        this._particleAmount = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleSizeLow    : Number = 10 ;
    public getParticleSizeLow():Number { return this._particleSizeLow; }
    public setParticleSizeLow(val:Number) {
        this._particleSizeLow = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleSizeHigh   : Number = 50 ;
    public getParticleSizeHigh():Number { return this._particleSizeHigh; }
    public setParticleSizeHigh(val:Number) {
        this._particleSizeHigh = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleSizeMin    : Number = 1;
    public getParticleSizeMin() : Number { return this._particleSizeMin; }
    public setParticleSizeMin(val:Number) {
        this._particleSizeMin = val;
        this.modelUpdateSignal.dispatch(null);
    }
    
    private _particleSizeMax    : Number = 100;
    public getParticleSizeMax() : Number { return this._particleSizeMax; }
    public setParticleSizeMax(val:Number) {
        this._particleSizeMax = val;
        this.modelUpdateSignal.dispatch(null);
    }
        


    private _particleSpeedMin    : Number = 1;
    public getparticleSpeedMin() : Number { return this._particleSpeedMin; }
    public setparticleSpeedMin(val:Number) {
        this._particleSpeedMin = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleSpeedMax    : Number = 10;
    public getparticleSpeedMax() : Number { return this._particleSpeedMax; }
    public setparticleSpeedMax(val:Number) {
        this._particleSpeedMax = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleSpeedLow    : Number = 1;
    public getparticleSpeedLow() : Number { return this._particleSpeedLow; }
    public setparticleSpeedLow(val:Number) {
        this._particleSpeedLow = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleSpeedHigh    : Number = 5;
    public getparticleSpeedHigh() : Number { return this._particleSpeedHigh; }
    public setparticleSpeedHigh(val:Number) {
        this._particleSpeedHigh = val;
        this.modelUpdateSignal.dispatch(null);
    }


    private _particleLifeMin    : Number = 2;
    public getparticleLifeMin() : Number { return this._particleLifeMin; }
    public setparticleLifeMin(val:Number) {
        this._particleLifeMin = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleLifeMax    : Number = 5;
    public getparticleLifeMax() : Number { return this._particleLifeMax; }
    public setparticleLifeMax(val:Number) {
        this._particleLifeMax = val;
        this.modelUpdateSignal.dispatch(null);
    }


    private _particleLifeLow    : Number = 3;
    public getparticleLifeLow() : Number { return this._particleLifeLow; }
    public setparticleLifeLow(val:Number) {
        this._particleLifeLow = val;
        this.modelUpdateSignal.dispatch(null);
    }


    private _particleLifeHigh    : Number = 4;
    public getparticleLifeHigh() : Number { return this._particleLifeHigh; }
    public setparticleLifeHigh(val:Number) {
        this._particleLifeHigh = val;
        this.modelUpdateSignal.dispatch(null);
    }


    private _particleStrengthMin    : Number = 1;
    public getparticleStrengthMin() : Number { return this._particleStrengthMin; }
    public setparticleStrengthMin(val:Number) {
        this._particleStrengthMin = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleStrengthMax    : Number = 10;
    public getparticleStrengthMax() : Number { return this._particleStrengthMax; }
    public setparticleStrengthMax(val:Number) {
        this._particleStrengthMax = val;
        this.modelUpdateSignal.dispatch(null);
    }

    private _particleStrength    : Number = 5;
    public getparticleStrength() : Number { return this._particleStrength; }
    public setparticleStrength(val:Number) {
        this._particleStrength = val;
        this.modelUpdateSignal.dispatch(null);
    }

}
