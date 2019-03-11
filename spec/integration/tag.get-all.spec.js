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

        beforeEach( async () =>
        {
            response = await endpoint.api.get( '/tags' ).then();
        });

        /**
         * @type { import( 'supertest' ).Response }
         */
        let response;

        describe( 'body', () =>
        {

            it( 'is object', () =>
            {
                expect( typeof response.body ).toBe( 'object' );
            });

            it( '.status is "success"', () =>
            {
                expect( response.body.status ).toBe( 'success' );
            });

        });
    });

});
