const { NODE_ENV } = require( '../../src/env' );


describe( 'nothing', () =>
{

    it( 'means nothing', () =>
    {
        expect( NODE_ENV ).toBe( 'test' );
    });

})
