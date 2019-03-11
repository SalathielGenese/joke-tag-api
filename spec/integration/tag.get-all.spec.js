import { endpoint } from '../endpoint';



describe( 'GET /tags', () =>
{

    describe( 'path', () =>
    {

        it( 'exists', done =>
        {
            endpoint.api.get( '/tags' ).end( ( error, response ) =>
            {
                expect( response.status ).not.toBe( 404 );
                done();
            });
        });

    });

    describe( 'response', () =>
    {
    });

});
