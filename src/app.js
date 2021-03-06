import body_parser from 'body-parser';
import { NODE_ENV } from './env';
import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import cors from 'cors';



const logerror = debug( 'joke:joke-tag-api:/src/app:error' );
const IS_LOGGING_ENABLED = 'test' !== NODE_ENV;
export const app = express();
const status = 'success';
const extended = false;

app.use( cors() );
app.use( body_parser.json() );
IS_LOGGING_ENABLED &&
    app.use( morgan( 'dev' ) );
app.use( express.urlencoded({ extended }) );

app.use( '/PING', ( request, response ) =>
{
    response.json({ status, content: 'PONG' });
});

export const registerErrorHandlers = () =>
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
        let { status: code = 500 } = error;
        const { message = error } = error;
        const body = { status, message };

        if ( error.failedValidation && error.results )
        {
            code = 409;
            body.errors = error.results.errors.map( error =>
            {
                return ({
                    key: error.path[0],
                    message: error.message
                });
            });
        }

        logerror( error );
        response.status( code ).json( body );
    });
};
