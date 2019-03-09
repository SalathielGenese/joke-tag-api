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
    response.json({
        status: 'sucess',
        content: { id: Math.random(), label: Math.random.toString( 36 ).slice( 2 ) },
    });
};
