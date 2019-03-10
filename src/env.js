const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = +process.env.PORT || 3000;

if ( 'development' === NODE_ENV )
    process.env.DEBUB = '*';

const PG_PASSWORD = process.env.PG_PASSWORD || 'postgres';
const PG_HOST = process.env.PG_HOST || 'postgres';
const PG_USER = process.env.PG_USER || 'postgres';
const PG_DB = process.env.PG_DB || 'postgres';


module.exports = {
    PG_PASSWORD,
    PG_HOST,
    PG_USER,
    PG_DB,

    NODE_ENV,
    PORT,
};
