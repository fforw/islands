var indices = [];

var vertices = [];
var normals = [];
var colors = [];

var size = 20;
var segments = 2;

var halfSize = size / 2;
var segmentSize = size / segments;

// generate vertices, normals and color data for a simple grid geometry

for ( var i = 0; i <= segments; i ++ ) {

    var y = ( i * segmentSize ) - halfSize;

    for ( var j = 0; j <= segments; j ++ ) {

        var x = ( j * segmentSize ) - halfSize;

        vertices.push( x, - y, 0 );
        normals.push( 0, 0, 1 );

        var r = ( x / size ) + 0.5;
        var g = ( y / size ) + 0.5;

        colors.push( r, g, 1 );

    }

}

// generate indices (data for element array buffer)

for ( var i = 0; i < segments; i ++ ) {

    for ( var j = 0; j < segments; j ++ ) {

        var a = i * ( segments + 1 ) + ( j + 1 );
        var b = i * ( segments + 1 ) + j;
        var c = ( i + 1 ) * ( segments + 1 ) + j;
        var d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );

        // generate two faces (triangles) per iteration

        indices.push( a, b, d ); // face one
        indices.push( b, c, d ); // face two

    }

}

console.log({
    vertices,
    indices
})

