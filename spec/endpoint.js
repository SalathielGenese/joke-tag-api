import { app } from '../src/index';
import supertest from 'supertest';



export const endpoint = {
    get api()
    {
        return supertest( app );
    },
};
