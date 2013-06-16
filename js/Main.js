var SignalBinding = (function () {
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
        this.active = true;
        this.params = null;
        this._listener = listener;
        this._isOnce = isOnce;
        this.context = listenerContext;
        this._signal = signal;
        this._priority = priority || 0;
    }
    SignalBinding.prototype.execute = function (paramsArr) {
        var handlerReturn, params;
        if(this.active && !!this._listener) {
            params = this.params ? this.params.concat(paramsArr) : paramsArr;
            handlerReturn = this._listener.apply(this.context, params);
            if(this._isOnce) {
                this.detach();
            }
        }
        return handlerReturn;
    };
    SignalBinding.prototype.detach = function () {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    };
    SignalBinding.prototype.isBound = function () {
        return (!!this._signal && !!this._listener);
    };
    SignalBinding.prototype.getListener = function () {
        return this._listener;
    };
    SignalBinding.prototype._destroy = function () {
        delete this._signal;
        delete this._listener;
        delete this.context;
    };
    SignalBinding.prototype.isOnce = function () {
        return this._isOnce;
    };
    SignalBinding.prototype.toString = function () {
        return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
    };
    return SignalBinding;
})();
function validateListener(listener, fnName) {
    if(typeof listener !== 'function') {
        throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
    }
}
var Signal = (function () {
    function Signal() {
        this._bindings = [];
        this._prevParams = null;
        this.VERSION = '::VERSION_NUMBER::';
        this.memorize = false;
        this._shouldPropagate = true;
        this.active = true;
    }
    Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
        var prevIndex = this._indexOfListener(listener, listenerContext);
        var binding;
        if(prevIndex !== -1) {
            binding = this._bindings[prevIndex];
            if(binding.isOnce() !== isOnce) {
                throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
            }
        } else {
            binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
            this._addBinding(binding);
        }
        if(this.memorize && this._prevParams) {
            binding.execute(this._prevParams);
        }
        return binding;
    };
    Signal.prototype._addBinding = function (binding) {
        var n = this._bindings.length;
        do {
            --n;
        }while(this._bindings[n] && binding._priority <= this._bindings[n]._priority);
        this._bindings.splice(n + 1, 0, binding);
    };
    Signal.prototype._indexOfListener = function (listener, context) {
        var n = this._bindings.length, cur;
        while(n--) {
            cur = this._bindings[n];
            if(cur._listener === listener && cur.context === context) {
                return n;
            }
        }
        return -1;
    };
    Signal.prototype.has = function (listener, context) {
        return this._indexOfListener(listener, context) !== -1;
    };
    Signal.prototype.add = function (listener, listenerContext, priority) {
        validateListener(listener, 'add');
        return this._registerListener(listener, false, listenerContext, priority);
    };
    Signal.prototype.addOnce = function (listener, listenerContext, priority) {
        validateListener(listener, 'addOnce');
        return this._registerListener(listener, true, listenerContext, priority);
    };
    Signal.prototype.remove = function (listener, context) {
        validateListener(listener, 'remove');
        var i = this._indexOfListener(listener, context);
        if(i !== -1) {
            this._bindings[i]._destroy();
            this._bindings.splice(i, 1);
        }
        return listener;
    };
    Signal.prototype.removeAll = function () {
        var n = this._bindings.length;
        while(n--) {
            this._bindings[n]._destroy();
        }
        this._bindings.length = 0;
    };
    Signal.prototype.getNumListeners = function () {
        return this._bindings.length;
    };
    Signal.prototype.halt = function () {
        this._shouldPropagate = false;
    };
    Signal.prototype.dispatch = function (params) {
        if(!this.active) {
            return;
        }
        var paramsArr = Array.prototype.slice.call(arguments), n = this._bindings.length, bindings;
        if(this.memorize) {
            this._prevParams = paramsArr;
        }
        if(!n) {
            return;
        }
        bindings = this._bindings.slice(0);
        this._shouldPropagate = true;
        do {
            n--;
        }while(bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
    };
    Signal.prototype.forget = function () {
        this._prevParams = null;
    };
    Signal.prototype.dispose = function () {
        this.removeAll();
        delete this._bindings;
        delete this._prevParams;
    };
    Signal.prototype.toString = function () {
        return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
    };
    return Signal;
})();
var ParticlesModel = (function () {
    function ParticlesModel() {
        this.modelUpdateSignal = new Signal();
        this._particleAmount = 250;
        this._particleSizeLow = 10;
        this._particleSizeHigh = 50;
        this._particleSizeMin = 1;
        this._particleSizeMax = 100;
        this._particleSpeedMin = 1;
        this._particleSpeedMax = 10;
        this._particleSpeedLow = 1;
        this._particleSpeedHigh = 5;
        this._particleLifeMin = 2;
        this._particleLifeMax = 5;
        this._particleLifeLow = 3;
        this._particleLifeHigh = 4;
        this._particleStrengthMin = 1;
        this._particleStrengthMax = 10;
        this._particleStrength = 5;
    }
    ParticlesModel.prototype.getParticleAmount = function () {
        return this._particleAmount;
    };
    ParticlesModel.prototype.setParticleAmount = function (val) {
        this._particleAmount = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getParticleSizeLow = function () {
        return this._particleSizeLow;
    };
    ParticlesModel.prototype.setParticleSizeLow = function (val) {
        this._particleSizeLow = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getParticleSizeHigh = function () {
        return this._particleSizeHigh;
    };
    ParticlesModel.prototype.setParticleSizeHigh = function (val) {
        this._particleSizeHigh = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getParticleSizeMin = function () {
        return this._particleSizeMin;
    };
    ParticlesModel.prototype.setParticleSizeMin = function (val) {
        this._particleSizeMin = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getParticleSizeMax = function () {
        return this._particleSizeMax;
    };
    ParticlesModel.prototype.setParticleSizeMax = function (val) {
        this._particleSizeMax = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleSpeedMin = function () {
        return this._particleSpeedMin;
    };
    ParticlesModel.prototype.setparticleSpeedMin = function (val) {
        this._particleSpeedMin = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleSpeedMax = function () {
        return this._particleSpeedMax;
    };
    ParticlesModel.prototype.setparticleSpeedMax = function (val) {
        this._particleSpeedMax = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleSpeedLow = function () {
        return this._particleSpeedLow;
    };
    ParticlesModel.prototype.setparticleSpeedLow = function (val) {
        this._particleSpeedLow = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleSpeedHigh = function () {
        return this._particleSpeedHigh;
    };
    ParticlesModel.prototype.setparticleSpeedHigh = function (val) {
        this._particleSpeedHigh = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleLifeMin = function () {
        return this._particleLifeMin;
    };
    ParticlesModel.prototype.setparticleLifeMin = function (val) {
        this._particleLifeMin = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleLifeMax = function () {
        return this._particleLifeMax;
    };
    ParticlesModel.prototype.setparticleLifeMax = function (val) {
        this._particleLifeMax = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleLifeLow = function () {
        return this._particleLifeLow;
    };
    ParticlesModel.prototype.setparticleLifeLow = function (val) {
        this._particleLifeLow = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleLifeHigh = function () {
        return this._particleLifeHigh;
    };
    ParticlesModel.prototype.setparticleLifeHigh = function (val) {
        this._particleLifeHigh = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleStrengthMin = function () {
        return this._particleStrengthMin;
    };
    ParticlesModel.prototype.setparticleStrengthMin = function (val) {
        this._particleStrengthMin = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleStrengthMax = function () {
        return this._particleStrengthMax;
    };
    ParticlesModel.prototype.setparticleStrengthMax = function (val) {
        this._particleStrengthMax = val;
        this.modelUpdateSignal.dispatch(null);
    };
    ParticlesModel.prototype.getparticleStrength = function () {
        return this._particleStrength;
    };
    ParticlesModel.prototype.setparticleStrength = function (val) {
        this._particleStrength = val;
        this.modelUpdateSignal.dispatch(null);
    };
    return ParticlesModel;
})();
var MenuView = (function () {
    function MenuView(container) {
        this.container = container;
    }
    MenuView.prototype.init = function () {
        console.log("menuView init");
        this.particleAmountSlider = new JSlider({
            elementName: "#slider-amount",
            min: 100,
            max: 500,
            defaultNum: this._model.getParticleAmount()
        });
        this.particleAmountSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleAmountSlider.init();
        this.particleSizeSlider = new JSliderRange({
            elementName: "#slider-size",
            min: this._model.getParticleSizeMin(),
            max: this._model.getParticleSizeMax(),
            defaultNum: 0,
            low: this._model.getParticleSizeLow(),
            high: this._model.getParticleSizeHigh()
        });
        this.particleSizeSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleSizeSlider.init();
        this.particleSpeedSlider = new JSliderRange({
            elementName: "#slider-speed",
            min: this._model.getparticleSpeedMin(),
            max: this._model.getparticleSpeedMax(),
            defaultNum: 0,
            low: this._model.getparticleSpeedLow(),
            high: this._model.getparticleSpeedHigh()
        });
        this.particleSpeedSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleSpeedSlider.init();
        this.particleLifeSlider = new JSliderRange({
            elementName: "#slider-life",
            min: this._model.getparticleLifeMin(),
            max: this._model.getparticleLifeMax(),
            defaultNum: 0,
            low: this._model.getparticleLifeLow(),
            high: this._model.getparticleLifeHigh()
        });
        this.particleLifeSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleLifeSlider.init();
        this.particleStrengthSlider = new JSlider({
            elementName: "#slider-strength",
            min: this._model.getparticleStrengthMin(),
            max: this._model.getparticleStrengthMax(),
            defaultNum: this._model.getparticleStrength()
        });
        this.particleStrengthSlider.onChangeSignal.add(this.onValueChange, this);
        this.particleStrengthSlider.init();
        this.particleAmountOutput = new JSliderOutput("#partAmount");
        this.particleSizeOuput = new JSliderOutput("#partSize");
        this.particleSpeedOutput = new JSliderOutput("#partSpeed");
        this.particleLifeOutput = new JSliderOutput("#partLife");
        this.particleStrengthOutput = new JSliderOutput("#partStrength");
        this.onModelUpdate();
    };
    MenuView.prototype.onValueChange = function (elementName) {
        var numbers = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            numbers[_i] = arguments[_i + 1];
        }
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
    };
    MenuView.prototype.setModel = function (model) {
        this._model = model;
        this._model.modelUpdateSignal.add(this.onModelUpdate, this);
    };
    MenuView.prototype.onModelUpdate = function () {
        this.particleAmountOutput.setValue(String(this._model.getParticleAmount()));
        this.particleSizeOuput.setValue(this._model.getParticleSizeLow() + " - " + this._model.getParticleSizeHigh());
        this.particleSpeedOutput.setValue(this._model.getparticleSpeedLow() + " - " + this._model.getparticleSpeedHigh());
        this.particleLifeOutput.setValue(this._model.getparticleLifeLow() + " - " + this._model.getparticleLifeHigh());
        this.particleStrengthOutput.setValue(String(this._model.getparticleStrength()));
    };
    return MenuView;
})();
var ParticleView = (function () {
    function ParticleView() {
    }
    ParticleView.prototype.init = function () {
        console.log("partivleView Init");
        this.particleContainer = new createjs.Container();
        this.fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#FFF");
        this.stage.addChild(this.fpsLabel);
        this.fpsLabel.x = 400;
        this.fpsLabel.y = 0;
        var _this = this;
        createjs.Ticker.addEventListener('tick', function () {
            _this.tick();
        });
        createjs.Ticker.setFPS(60);
        var emiter = new Emiter(this.stage.canvas.width / 2, this.stage.canvas.height / 2);
        this.stage.addChild(emiter);
    };
    ParticleView.prototype.setStage = function (stage) {
        this.stage = stage;
    };
    ParticleView.prototype.setModel = function (model) {
        this._model = model;
    };
    ParticleView.prototype.tick = function () {
        this.fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        this.stage.update();
    };
    return ParticleView;
})();
var StageView = (function () {
    function StageView(container) {
        this.container = container;
    }
    StageView.prototype.init = function () {
        console.log("partivleView Init");
        if(window.top != window) {
            document.getElementById("header").style.display = "none";
        }
        this.canvas = document.getElementById("mainCanvas");
        this.stage = new createjs.Stage(this.canvas);
        var _this = this;
        window.addEventListener('resize', function () {
            _this.resize();
        });
        this.resize();
    };
    StageView.prototype.resize = function () {
        this.stage.canvas.width = window.innerWidth;
        this.stage.canvas.height = window.innerHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.canvas.y = this.stage.canvas.height / 2;
    };
    StageView.prototype.getStage = function () {
        return this.stage;
    };
    return StageView;
})();
var JSlider = (function () {
    function JSlider(options) {
        this.onChangeSignal = new Signal();
        this._options = options;
        this._elementName = options.elementName;
        this._min = options.min;
        this._max = options.max;
        this._defaultNum = options.defaultNum;
        this._slider = $(this._elementName);
    }
    JSlider.prototype.getOptions = function () {
        return this._options;
    };
    JSlider.prototype.init = function () {
        var _this = this;
        this._slider.slider({
            min: this._min,
            max: this._max,
            value: this._defaultNum,
            slide: (function (event, ui) {
                _this.onSlide(event, ui);
            })
        });
    };
    JSlider.prototype.onSlide = function (event, ui) {
        this.onChangeSignal.dispatch(this._elementName, ui.value);
    };
    return JSlider;
})();
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JSliderRange = (function (_super) {
    __extends(JSliderRange, _super);
    function JSliderRange(options) {
        _super.call(this, {
    elementName: options.elementName,
    min: options.min,
    max: options.max,
    defaultNum: options.defaultNum
});
        this.onChangeSignal = new Signal();
        this._low = options.low;
        this._high = options.high;
        this._slider = $(options.elementName);
    }
    JSliderRange.prototype.init = function () {
        var _this = this;
        console.log("init jsliderRange2");
        this._slider.slider({
            min: _super.prototype.getOptions.call(this).min,
            max: _super.prototype.getOptions.call(this).max,
            value: _super.prototype.getOptions.call(this).defaultNum,
            slide: (function (event, ui) {
                _this.onSlide(event, ui);
            })
        });
        this._slider.slider({
            range: true,
            min: _super.prototype.getOptions.call(this).min,
            max: _super.prototype.getOptions.call(this).max,
            values: [
                this._low, 
                this._high
            ],
            slide: (function (event, ui) {
                _this.onSlide(event, ui);
            })
        });
    };
    JSliderRange.prototype.onSlide = function (event, ui) {
        this.onChangeSignal.dispatch(_super.prototype.getOptions.call(this).elementName, ui.values);
    };
    return JSliderRange;
})(JSlider);
var JSliderOutput = (function () {
    function JSliderOutput(elementName) {
        this._elementName = elementName;
    }
    JSliderOutput.prototype.setValue = function (val) {
        $(this._elementName).val(String(val));
    };
    return JSliderOutput;
})();
var Emiter = (function (_super) {
    __extends(Emiter, _super);
    function Emiter(x, y) {
        _super.call(this);
        this._circleRadius = 50;
        this.graphics.setStrokeStyle(5);
        this.graphics.beginStroke("#000000");
        this.graphics.beginFill("#ffffff").drawCircle(1, 1, this._circleRadius - 2);
        this.x = x + this._circleRadius / 2;
        this.y = y + this._circleRadius / 2;
    }
    return Emiter;
})(createjs.Shape);
var EaselParticlesContainer = (function () {
    function EaselParticlesContainer(container) {
        console.log("started22");
        this.container = container;
        this.particleModel = new ParticlesModel();
        this.menuView = new MenuView(this.container);
        this.menuView.setModel(this.particleModel);
        this.menuView.init();
        this.stageView = new StageView(this.container);
        this.stageView.init();
        this.particleView = new ParticleView();
        this.particleView.setStage(this.stageView.getStage());
        this.particleView.setModel(this.particleModel);
        this.particleView.init();
    }
    return EaselParticlesContainer;
})();
//@ sourceMappingURL=Main.js.map
