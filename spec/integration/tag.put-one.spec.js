import { sequelize } from '../../models/index';
import { endpoint } from '../endpoint';
import uuid from 'uuid/v4';


describe( 'PUT /tag/{id}', () =>
{

    const Tag = sequelize.model( 'Tag' );

    describe( 'response', () =>
    {

        beforeEach( async () =>
        {
            label = uuid();
            tag = await Tag.create({ label: uuid() });
            response = await endpoint.api.put( `/tag/${ tag.id }` ).send({ label }).then();
        });

        afterEach( async () =>
        {
            await Tag.destroy({ where: { id: response.body.id } });
        });

        /**
         * @type { import( 'supertest' ).Response & { status: number, body: { status: string, content: Tag } } }
         */
        let response;
        /**
         * @type { string }
         */
        let label;
        /**
         * @typedef {{ id: number, label: string }} Tag
         * @type { Tag }
         */
        let tag;

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

        it( 'HTTP 404 upon tag not found', async () =>
        {
            const { status } = await endpoint.api.put( `/tag/${ tag.id + 1E7 }` ).send({ label }).then( void 0, reason => reason );

            expect( status ).toBe( 404 );
        });

        it( 'body .status equal "error", upon tag not found', async () =>
        {
            const { status } = await endpoint.api.put( `/tag/${ tag.id + 1E7 }` ).send({ label }).then( void 0, reason => reason );

            expect( status ).toBe( 404 );
        });

    });

});
