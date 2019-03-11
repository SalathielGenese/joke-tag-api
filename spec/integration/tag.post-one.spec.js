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
            response = await endpoint.api
                .post( '/tags' ).send({ label: uuid() }).then();
        });

        afterEach( async () =>
        {
            await Tag.destroy({ where: { id: response.body.id } });
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

            it( '.content is object', () =>
            {
                expect( typeof response.body.content ).toBe( 'object' );
            });

            it( '.content.id is number', () =>
            {
                expect( typeof response.body.content.id ).toBe( 'number' );
            });

        });

    });

});
