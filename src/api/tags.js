import { sequelize } from '../../models/index';



/**
 * @swagger
 * /tags:
 *   get:
 *     tags: [ "Tags" ]
 *     summary: Tags list
 *     operationId: tags_get_tags
 *     description: List all tags
 *     responses:
 *       200:
 *         $ref: '#/responses/TagsRet'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'express' ).NextFunction } next
 * @param { import( 'swagger-tools' ).Swagger20Request } request
 * @param { import( 'swagger-tools' ).Swagger20Response & import( 'express' ).Response } response
 * @param { import( 'express' ).NextFunction } next
 *
 */
export const get_tags = ( request, response, next ) =>
{
    return Tag.findAll().then( content =>
    {
        response.json({ content, status: 'success' });
    }).catch( next );
};

/**
 * @swagger
 * /tags:
 *   post:
 *     tags: [ "Tags" ]
 *     summary: Tags creation
 *     operationId: tags_post_tags
 *     description: Create tag
 *     parameters:
 *     - in: body
 *       name: tag
 *       required: true
 *       schema:
 *         required:
 *         - label
 *         type: object
 *         properties:
 *           label:
 *             type: string
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
 * @param { import( 'swagger-tools' ).Swagger20Response & import( 'express' ).Response } response
 * @param { import( 'express' ).NextFunction } next
 *
 */
export const post_tags = ( request, response, next ) =>
{
    const { label } = request.swagger.params.tag.value;

    return Tag.findAll({ where: { label } }).then( tags =>
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
            next( error );
            return;
        }

        return Tag.create({ label }).then( content =>
        {
            response.json({ content, status: 'success' });
        });
    }).catch( next );
};

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     tags: [ "Tags" ]
 *     summary: Tags update
 *     operationId: tags_put_tag
 *     description: Update a tag
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *     - in: body
 *       name: tag
 *       required: true
 *       schema:
 *         required:
 *         - label
 *         type: object
 *         properties:
 *           label:
 *             type: string
 *     responses:
 *       200:
 *         $ref: '#/responses/TagRet'
 *       404:
 *         $ref: '#/responses/404ErrorResponse'
 *       409:
 *         $ref: '#/responses/validationErrorResponse'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'swagger-tools' ).Swagger20Request } request
 * @param { import( 'swagger-tools' ).Swagger20Response & import( 'express' ).Response } response
 * @param { import( 'express' ).NextFunction } next
 *
 */
export const put_tag = ( request, response, next ) =>
{
    const { value: id } = request.swagger.params.id;
    const { label } = request.swagger.params.tag.value;

    Tag.findById( id ).then( tag =>
    {
        if ( null !== tag ) return tag;
        const error = new Error( 'Not found' );

        error.status = 404;
        throw error;
    }).then( async tag =>
        [ tag, await Tag.find({ where: { label } }) ]
    ).then( ([ tag, tagById ] ) =>
    {
        if ( null === tagById || id == tagById.id ) return tag;

        const error = new Error( 'Validation error' );

        error.failedValidation = true;
        error.results = { errors: [ {
            path: [ 'label' ],
            message: 'Duplicate field value',
        } ] };

        throw error;
    }).then( tag =>
    {
        tag.label = label;
        return tag.save();
    }).then( content =>
        response.json({ content, status: 'success' })
    ).catch( next );
};

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     tags: [ "Tags" ]
 *     summary: Tag fetch by ID
 *     operationId: tags_get_tag
 *     description: Get tag by its ID
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *     responses:
 *       200:
 *         $ref: '#/responses/TagRet'
 *       404:
 *         $ref: '#/responses/404ErrorResponse'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'swagger-tools' ).Swagger20Request } request
 * @param { import( 'swagger-tools' ).Swagger20Response & import( 'express' ).Response } response
 * @param { import( 'express' ).NextFunction } next
 *
 */
export const get_tag = ( request, response, next ) =>
{
    return Tag.findById( request.swagger.params.id.value ).then( content =>
    {
        if ( null === content )
        {
            const error = new Error( 'Not found' );

            error.status = 404;
            next( error );
            return;
        }

        response.json({ content, status: 'success' });
    }).catch( next );
};

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     tags: [ "Tags" ]
 *     summary: Tag delete
 *     operationId: tags_delete_tag
 *     description: Delete tag by its ID
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *     responses:
 *       200:
 *         $ref: '#/responses/TagDeleteRet'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'swagger-tools' ).Swagger20Request } request
 * @param { import( 'swagger-tools' ).Swagger20Response & import( 'express' ).Response } response
 * @param { import( 'express' ).NextFunction } next
 *
 */
export const delete_tag = ( request, response, next ) =>
{
    const id = request.swagger.params.id.value;

    return Tag.destroy({ where: { id } }).then( () =>
    {
        response.json({ content: id, status: 'success' });
    }).catch( next );
};

const Tag = sequelize.model( 'Tag' );
