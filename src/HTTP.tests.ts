import HTTP from "./HTTP"

test( "getting json data from remote service", function () {
    const http = new HTTP( "https://httpbin.org" )

    return http.get( "/get?name=foobar" ).then( function ( data ) {
        expect( data.args ).toEqual( {
            name: "foobar"
        } )
    } )
} )

test( "posting json data to remote service", function () {
    const http = new HTTP( "https://httpbin.org" )

    return http.post( "/post", { name: "foobar" } ).then( function ( response ) {
        expect( response.status ).toEqual( 200 )
        expect( response.body.json ).toEqual( {
            name: "foobar"
        } )
    } )
} )

test( "handling an error when posting to invalid uri", function () {
    const http = new HTTP( "https://httpbin.org" )

    return http.post( "/invalid", {} ).then( function ( response ) {
        expect( response.status ).toEqual( 404 )
    } )
} )
