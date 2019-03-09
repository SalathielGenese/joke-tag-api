import { sequelize } from '../models/index';
import debug from 'debug';



/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     tags: [ "Tags" ]
 *     summary: Tags list
 *     operationId: get_tag_by_id
 *     description: Get tag by its ID
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *     responses:
 *       200:
 *         $ref: '#/responses/TagRet'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'express' ).Request } request
 * @param { import( 'express' ).Response } response
 *
 */
export const get_tag_by_id = ( request, response ) =>
{
    sequelize.model( 'Tag' ).findById( request.swagger.params.id.value ).then( content =>
    {
        response.json({ content, status: 'sucess' });
    }).catch( reason =>
    {
        logerror( reason );
        throw reason;
    });
};

const logerror = debug( 'joke:joke-tag-api:/src/api.tags:error' );
