import { sequelize } from '../../models/index';
import { endpoint } from '../endpoint';
import uuid from 'uuid/v4';



describe( 'GET /tags', () =>
{

    const Tag = sequelize.model( 'Tag' );

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

            it( '.content as Array', () =>
            {
                expect( Array.isArray( response.body.content ) ).toBe( true );
            });

            it( '.content has all entities', async () =>
            {
                const sometags = [];
                for ( let i = 0; i < 10; i++ )
                    sometags.push( ( await Tag.create({ label: uuid.v4() }) ).dataValues );
                const tags = ( await endpoint.api.get( '/tags' ) ).body.content;
                const HAS_ALL_CREATED_TAGS = sometags.every( sometag =>
                    tags.find( tag => tag.id == sometag.id && tag.label === sometag.label ));

                expect( HAS_ALL_CREATED_TAGS ).toBe( true );

                await Tag.destroy({ where: { id: sometags.map( tag => tag.id ) } });
            });

        });
    });

});
