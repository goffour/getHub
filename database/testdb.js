const { Pool } = require('pg');
const dotenv = require('dotenv').config();

//connection to remote database
const { TEST_PG_URI } = process.env;
const pool = new Pool({ connectionString: TEST_PG_URI });


module.exports = {
	query: (text, params, callback) => {
		console.log('Executed Query', text);
		return pool.query(text, params, callback);
	}

}