class JSliderOutput {

    private _elementName   ;

    constructor( elementName  : String ) {
        this._elementName = elementName;
    }

    public setValue( val : String ) {
        $( this._elementName ).val( String( val )  );
    }
}