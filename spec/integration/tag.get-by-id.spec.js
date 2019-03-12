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

    describe( 'response', () =>
    {

        describe( 'body', () =>
        {

            it( 'is object', async () =>
            {
                const { body } = await endpoint.api.get( `/tag/${ tag.id }` ).then();

                expect( typeof body ).toBe( 'object' );
            });

        });

    });

});
