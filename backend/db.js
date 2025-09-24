/** DEV **/

/*const Pool = require('pg').Pool;
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_PRODUSER,
    password: process.env.DB_PRODPASS,
    host: process.env.DB_PRODHOST,
    schema: process.env.DB_DEVSCHEMA,
    database: process.env.DB_PRODDATABASE,
   // ssl: true
});


module.exports = pool;*/

import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the postgres client
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

export default sql;