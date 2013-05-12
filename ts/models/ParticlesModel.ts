class ParticlesModel {

    private _particleAmount:Number = 250;            // Number of particles on the screen at once

    constructor() {

    }

    public setParticleAmount(val:Number) {
        this._particleAmount = val;
    }

    public getParticleAmount():Number {
        return this._particleAmount;
    }
}
