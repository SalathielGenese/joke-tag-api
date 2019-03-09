import { app } from '../../src/index';
import supertest from 'supertest';



describe( 'GET /tags', () =>
{

    beforeEach( () =>
    {
        request = supertest( app );
    });

    /**
     * @type { supertest.SuperTest<supertest.Test> }
     */
    let request;

    describe( 'path', () =>
    {

        it( 'exists', done =>
        {
            request.get( '/tags' ).end( ( error, response ) =>
            {
                expect( response.status ).not.toBe( 404 );
                done();
            });
        });

    });

});
