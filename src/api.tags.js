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
    return sequelize.model( 'Tag' ).findAll().then( content =>
    {
        response.json({ content, status: 'success' });
    }).catch( reason =>
    {
        logerror( reason );
        throw reason;
    });
};
/**
 * @swagger
 * /tags:
 *   post:
 *     tags: [ "Tags" ]
 *     summary: Tags list
 *     operationId: post_tags
 *     description: Create tag
 *     parameters:
 *     - in: body
 *       name: label
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         $ref: '#/responses/TagRet'
 *       409:
 *         $ref: '#/responses/validationErrorResponse'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'swagger-tools' ).Swagger20Request } request
 * @param { import( 'swagger-tools' ).Swagger20Response } response
 *
 */
export const post_tags = ( request, response ) =>
{
    const label = request.swagger.params.label.value;

    return sequelize.model( 'Tag' ).findAll({ where: { label } }).then( tags =>
    {
        if ( tags.length )
        {
            const error = new Error( 'Validation error' );

            error.failedValidation = true;
            error.results = {
                errors: [
                    {
                        path: [ 'label' ],
                        message: 'Duplicate field value',
                    },
                ],
            };

            throw error;
        }
        else
        {
            return sequelize.model( 'Tag' ).create({ label }).then( content =>
            {
                response.json({ content, status: 'success' });
            });
        }
    }).catch( reason =>
    {
        logerror( reason );
        throw reason;
    });
};

const logerror = debug( 'joke:joke-tag-api:/src/api.tags:error' );
