import { sequelize } from '../../models/index';
import { endpoint } from '../endpoint';
import uuid from 'uuid/v4';


describe( 'POST /tags', () =>
{

    const Tag = sequelize.model( 'Tag' );

    describe( 'response', () =>
    {

        beforeEach( async () =>
        {
            label = uuid();
            response = await endpoint.api
                .post( '/tags' ).send({ label }).then();
        });

        afterEach( async () =>
        {
            await Tag.destroy({ where: { id: response.body.id } });
        });

        /**
         * @type { import( 'supertest' ).Response }
         */
        let response;
        /**
         * @type { string }
         */
        let label;

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

            it( '.content is object', () =>
            {
                expect( typeof response.body.content ).toBe( 'object' );
            });

            it( '.content.id is number', () =>
            {
                expect( typeof response.body.content.id ).toBe( 'number' );
            });

            it( '.content.label is string', () =>
            {
                expect( typeof response.body.content.label ).toBe( 'string' );
            });

            it( '.content.label equals label', () =>
            {
                expect( response.body.content.label ).toBe( label );
            });

        });

        it( 'HTTP 409 upon duplicate label', async () =>
        {
            const { status } = await endpoint.api.post( '/tags' ).send({ label }).then( void 0, reason => reason );

            expect( status ).toBe( 409 );
        });

    });

});
