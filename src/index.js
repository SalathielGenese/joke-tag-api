import { initializeMiddleware } from 'swagger-tools';
import { app, registerErrorHandlers  } from './app';
import swagger_js_docs from 'swagger-jsdoc';
import { version } from '../package.json';
import { PORT, NODE_ENV } from './env';
import * as db from '../models/index';
import debug from 'debug';
import yaml from 'yamljs';



const swaggerDefinition = yaml.load( `${ __dirname }/index.yaml` );
const logmessage = debug( 'joke:joke-tag-api:/src/index:debug' );
const logerror = debug( 'joke:joke-api:/src/index:error' );
const IS_NOT_PRODUCTION_MODE = 'production' !== NODE_ENV;
const useStubs = 'development' === NODE_ENV;
const controllers = `${ __dirname }/api`;
const apiDocs = '/docs/api';
const swaggerUi = '/docs';
const swaggerSpec = swagger_js_docs({
    apis: [`${ controllers }/**/*.js`],
    swaggerDefinition,
});

swaggerSpec.info.version = version;
IS_NOT_PRODUCTION_MODE &&
    swaggerSpec.schemes.push( 'http' );
initializeMiddleware( swaggerSpec, ( middleware ) =>
{
    app.use( middleware.swaggerMetadata() );
    app.use( middleware.swaggerValidator() );
    app.use( middleware.swaggerRouter({
        controllers,
        useStubs,
    }) );

    app.use( middleware.swaggerUi({ swaggerUi, apiDocs }) );
    registerErrorHandlers();



    app.set('port', PORT);

    require.main == module && db.sequelize.sync().then( () =>
    {
        app.on('error', onError);
        app.listen( PORT, () =>
            logmessage( `Listening ::${ PORT }` )
        );
    });
});

function onError( error )
{
    logerror( error );

    if ( error.syscall !== 'listen' ) throw error;

    switch ( error.code )
    {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
}

export { app };
