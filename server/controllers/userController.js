const { request } = require('express');
const db = require('../../database/dbConnection');


const userController = {};

//create user when provided with signup credentials
/*
encrypt password
store in database
res.locals.verified object
invoke next to pass to session middlewares

*/
userController.createUser = (req, res, next) => {

};


//verify user when provided with login credentials
/*
	use bcrypt to compare password with password stored in database
	return res.locals.verified object
	invoke next to pass to session middlewares
*/
userController.loginUser = (req, res, next) => {



};

module.exports = userController;