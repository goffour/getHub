const { request } = require('express');
let db = require('../../database/dbConnection');
if (process.env.NODE_ENV === 'test'){
	db = require('../../database/testdb');
}

const sessionController = {};

//destroy session on logout


module.exports = sessionController;