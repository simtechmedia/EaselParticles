
interface IJsliderRangeOptions extends IJsliderOptions {
    low     : Number;
    high    : Number;
}

class JSliderRange extends JSlider
{

    public onChangeSignal   : Signal = new Signal();


    private _low    : Number ;      // Low Range
    private _high   : Number ;      // High Range

    private _slider ;

    constructor(options:IJsliderRangeOptions) {
        super({
            elementName : options.elementName ,
            min         : options.min,
            max         : options.max,
            defaultNum  : options.defaultNum
        });
        this._low       = options.low;
        this._high      = options.high;
        this._slider    = $(options.elementName);
    }

    public init()
    {
        console.log("init jsliderRange2");

        this._slider.slider({
            min: super.getOptions().min ,
            max: super.getOptions().max ,
            value: super.getOptions().defaultNum,
            slide : ((event : JQueryEventObject, ui:UIEvent) => {
                this.onSlide(event , ui );
            })
        });

        this._slider.slider({
            range: true,
            min: super.getOptions().min ,
            max: super.getOptions().max ,
            values: [ this._low, this._high ],
            slide : ((event : JQueryEventObject, ui:UIEvent) => {
                //$( "#partSize" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                //minSize = ui.values[ 0 ];
                //maxSize = ui.values[ 1 ];

                this.onSlide(event , ui );
            })
        });


        //console.log(options);
        /*
        this._slider.slider({
            min: super.getOptions().min ,
            max: super.options.max ,
            value: this._defaultNum,
            slide : ((event : JQueryEventObject, ui:UIEvent) => {
                this.onSlide(event , ui );
            })
        }); 8+*/
    }

    private onSlide ( event : JQueryEventObject , ui) {
        this.onChangeSignal.dispatch( super.getOptions().elementName , ui.values );
    }
}
