import { NODE_ENV } from '../../src/env';


describe( 'nothing', () =>
{

    it( 'means nothing', () =>
    {
        expect( NODE_ENV ).toBe( 'test' );
    });

})
