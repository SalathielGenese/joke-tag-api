import { sequelize } from '../../models/index';
import { endpoint } from '../endpoint';
import uuid from 'uuid';



describe( 'DELETE /tag/{id}', () =>
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

    describe( 'response', () =>
    {

        describe( 'body', () =>
        {

            it( 'is object', async () =>
            {
                const { body } = await endpoint.api.delete( `/tag/${ tag.id }` ).then();

                expect( typeof body ).toBe( 'object' );
            });

            it( '.status equals "success"', async () =>
            {
                const { body: { status } } = await endpoint.api.delete( `/tag/${ tag.id }` ).then();

                expect( status ).toBe( 'success' );
            });

            it( '.content equals id of deleted tag', async () =>
            {
                const { body: { content } } = await endpoint.api.delete( `/tag/${ tag.id }` ).then();

                expect( content ).toBe( tag.id );
            });

        });

    });

});
