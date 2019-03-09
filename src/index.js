import { initializeMiddleware } from 'swagger-tools';
import { app, registerErrorHandlers  } from './app';
import swagger_js_docs from 'swagger-jsdoc';
import { PORT, NODE_ENV } from './env';
import debug from 'debug';
import yaml from 'yamljs';



const swaggerDefinition = yaml.load( `${ __dirname }/index.yaml` );
const debugmessage = debug( 'joke:joke-api:/src/index:debug' );
const logerror = debug( 'joke:joke-api:/src/index:error' );
const useStubs = 'development' === NODE_ENV;
const controllers = __dirname;
const swaggerSpec = swagger_js_docs({
    apis: [`${ controllers }/*.js`],
    swaggerDefinition,
});

swaggerSpec.info.version = require('../package').version;

initializeMiddleware( swaggerSpec, ( middleware ) =>
{
    app.use( middleware.swaggerMetadata() );
    app.use( middleware.swaggerValidator() );
    app.use( middleware.swaggerRouter({
        controllers,
        useStubs,
    }) );

    app.use( middleware.swaggerUi() );
    registerErrorHandlers();



    app.set('port', PORT);

    if ( require.main == module )
    {
        app.on('listening', () => debugmessage( `Listening ::${ PORT }` ) );
        app.on('error', onError);
        app.listen(PORT);
    }
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


module.exports = app;
