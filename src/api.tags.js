import { sequelize } from '../models/index';
import debug from 'debug';



/**
 * @swagger
 * /tags:
 *   get:
 *     tags: [ "Tags" ]
 *     summary: Tags list
 *     operationId: get_tags
 *     description: List all tags
 *     responses:
 *       200:
 *         $ref: '#/responses/TagsRet'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'swagger-tools' ).Swagger20Request } request
 * @param { import( 'swagger-tools' ).Swagger20Response } response
 *
 */
export const get_tags = ( request, response ) =>
{
    sequelize.model( 'Tag' ).findAll().then( content =>
    {
        response.json({ content, status: 'success' });
    }).catch( reason =>
    {
        logerror( reason );
        throw reason;
    });
};

const logerror = debug( 'joke:joke-tag-api:/src/api.tags:error' );
