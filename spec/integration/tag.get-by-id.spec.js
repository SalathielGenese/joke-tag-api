import { sequelize } from '../../models/index';
import { endpoint } from '../endpoint';
import uuid from 'uuid';



describe( 'GET /tag/{id}', () =>
{
    beforeEach( async () =>
    {
        label = uuid();
        tag = await Tag.create({ label });
    });

    afterEach( async () =>
    {
        await tag.destroy();
    })

    let tag;
    let label;
    const Tag = sequelize.model( 'Tag' );

    it( 'respond HTTP 404 if not found', async () =>
    {
        const { status } = await endpoint.api.get( `/tag/${ tag.id + 1E7 }` ).then( void 0, reason => reason );

        expect( status ).toBe( 404 );
    });

    it( 'response body is object, if not found', async () =>
    {
        const { response: { body } } = await endpoint.api.get( `/tag/${ tag.id + 1E7 }` ).then( void 0, reason => reason );

        expect( typeof body ).toBe( 'object' );
    });

    it( 'response body .status equals "error", if not found', async () =>
    {
        const { response: { body: { status } } } = await endpoint.api.get( `/tag/${ tag.id + 1E7 }` ).then( void 0, reason => reason );

        expect( status ).toBe( 'error' );
    });

    describe( 'response', () =>
    {

        describe( 'body', () =>
        {

            it( 'is object', async () =>
            {
                const { body } = await endpoint.api.get( `/tag/${ tag.id }` ).then();

                expect( typeof body ).toBe( 'object' );
            });

            it( '.status equals "success"', async () =>
            {
                const { body: { status } } = await endpoint.api.get( `/tag/${ tag.id }` ).then();

                expect( status ).toBe( 'success' );
            });

            it( '.content is object', async () =>
            {
                const { body: { content } } = await endpoint.api.get( `/tag/${ tag.id }` ).then();

                expect( typeof content ).toBe( 'object' );
            });

            it( '.content.id is number', async () =>
            {
                const { body: { content: { id } } } = await endpoint.api.get( `/tag/${ tag.id }` ).then();

                expect( typeof id ).toBe( 'number' );
            });

            it( '.content.label equals label', async () =>
            {
                const { body: { content: { label: response_label } } } = await endpoint.api.get( `/tag/${ tag.id }` ).then();

                expect( response_label ).toBe( label );
            });

        });

    });

});
