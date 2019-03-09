import { NODE_ENV, PORT } from './env';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';



const IS_LOGGING_ENABLED = 'test' !== NODE_ENV;
export const app = express();
const status = 'success';
const extended = false;

app.use( cors() );
IS_LOGGING_ENABLED &&
    app.use( morgan( NODE_ENV ) );
app.use( express.bodyParser.json() );
app.use( express.urlencoded({ extended }) );

app.use( '/ping', ( request, response ) =>
{
    response.json({ status });
});

/**
 *
 * @param { express.Express } app
 */
export const onAppError = app =>
{
    app.use( ( request, response, next ) =>
    {
        const error = new Error( 'Not found' );

        error.status = 404;
        next( error );
    });

    const status = 'error';

    app.use( ( error, request, response, next ) =>
    {
        //
    });
};
