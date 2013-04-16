// PVector
function PVector ( x , y  )
{
    this.x = x;
    this.y = y;

    this.add = function ( v )
    {
        this.x += v.x;
        this.y += v.y;
    }

    this.sub = function ( v )
    {
        this.x -= v.x;
        this.y -= v.y;
    }

    this.normalize = function ( len )
    {
        var s = len / this.length();
        this.x *= s;
        this.y *= s;
    }

    this.limit = function(max)
    {
        if( this.x > max ) this.x = max;
        if( this.y > max ) this.y = max;
    }

    this.length = function()
    {
       return Math.sqrt( this.x*this.x + this.y*this.y );
    }

    this.multi =  function  ( multi )
    {
        this.x *= multi ;
        this.y *= multi ;
    }

    this.subStatic =  function ( vector1 , vector2 )
    {
        var newVector  = new PVector(vector1.x - vector2.x, vector1.y - vector2.y );
        return newVector;
    }
}

