class ParticlesModel {

    public modelUpdateSignal    : Signal = new Signal();





    private _particleSizeMax    : Number = 100;




    private _particleSpeedMin   : Number = 1;
    private _particleSpeedMax   : Number = 10;

    private _particleSpeedLow   : Number = 1;
    private _particleSpeedHigh  : Number = 5;

    constructor() {

    }

    private _particleSizeMin    : Number = 1;
    private _particleAmount     : Number = 250;            // Number of particles on the screen at once
    public getParticleAmount():Number { return this._particleAmount;}
    public setParticleAmount(val:Number) {
        this._particleAmount = val;
        this.modelUpdateSignal.dispatch();
    }

    private _particleSizeLow    : Number = 10 ;
    public getParticleSizeLow():Number { return this._particleSizeLow; }
    public setParticleSizeLow(val:Number) {
        this._particleSizeLow = val;
        this.modelUpdateSignal.dispatch();
    }

    private _particleSizeHigh   : Number = 50 ;
    public getParticleSizeHigh():Number { return this._particleSizeHigh; }
    public setParticleSizeHigh(val:Number) {
        this._particleSizeHigh = val;
        this.modelUpdateSignal.dispatch();
    }


    public setParticleSizeMin(val:Number) {
        this._particleSizeMin = val;
        this.modelUpdateSignal.dispose();
    }

    public getParticleSizeMin():Number { return this._particleSizeMin; }

    public setParticleSizeMax(val:Number) {
        this._particleSizeMax = val;
        this.modelUpdateSignal.dispose();
    }

    public getParticleSizeMax():Number {
        return this._particleSizeMax;
    }




}
