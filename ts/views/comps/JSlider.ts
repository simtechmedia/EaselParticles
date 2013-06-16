/**
 JQuery Slider Componant
 **/


interface IJsliderOptions {
    elementName : String;       // Element ID
    min         : Number;       // Minimal Number
    max         : Number;       // Maximum Value
    defaultNum  : Number;       // Default Value
}

class JSlider {

        public onChangeSignal   : Signal = new Signal();

        private _elementName    : String ;
        private _defaultNum     : Number;
        private _min            : Number ;
        private _max            : Number;
        private _slider ;
        private _options          : IJsliderOptions ;

        constructor( options    : IJsliderOptions ) {

            this._options        = options;
            this._elementName   = options.elementName ;
            this._min           = options.min ;
            this._max           = options.max ;
            this._defaultNum    = options.defaultNum;
            this._slider        = $(this._elementName);

        }

        public getOptions():IJsliderOptions {
            return this._options;
        }

        public init() {
            this._slider.slider({
                min: this._min ,
                max: this._max ,
                value: this._defaultNum,
                slide : ((event : JQueryEventObject, ui:UIEvent) => {
                    this.onSlide(event , ui );
                })
            });
        }

        private onSlide ( event : JQueryEventObject , ui) {
            this.onChangeSignal.dispatch( this._elementName , ui.value );
        }
 }
