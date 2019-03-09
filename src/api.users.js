/**
 * @swagger
 * /tags:
 *   x-swagger-router-controller: tags
 *   get:
 *     summary: Tags list
 *     operationId: get_tags
 *     description: |
 *       List all tags
 *     tags:
 *       - Tags
 *     responses:
 *       200:
 *         $ref: '#/responses/TagsRet'
 *       500:
 *         $ref: '#/responses/serverErrorResponse'
 *
 *
 * @param { import( 'express' ).Request } request
 * @param { import( 'express' ).Response } response
 *
 */
export const get_tags = ( request, response ) =>
{
    response.json({
        status: 'sucess',
        content: [],
    });
};
