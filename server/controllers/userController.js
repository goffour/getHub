const { request } = require('express');
const db = require('../../database/dbConnection');
const bcrypt = require('bcryptjs');

//salt hashing passwords
const SALT_WORK_FACTOR = 10;


const userController = {};

//create user when provided with signup credentials
/*
encrypt password
store in database
res.locals.verified object
invoke next to pass to session middlewares

*/
userController.createUser = (req, res, next) => {
	const { credentials } = req.body;

	//destructure credentials object to extract relevant information
	const { first_name, last_name, email, username, password } = credentials;
	let encryptPw = password;

	//address and zipcode will be handled in feature branch for user info updates
	const address = '123 Sesame Street';
	const zipcode = '12345';

	//Checking for missing inputs
	if(!first_name || !last_name || !email || !username || !password) {
		return next(createErr({
			'log': 'User Controller: Create user - Missing required information',
			'message': { err : 'userController.createUser: ERROR: Missing required information'}
		}));
	};

	//Email validation
	const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email_regex.test(email)) {
		return next(createErr({
			'log': 'User Controller: Create user - Invalid email',
			'message': { err : 'userController.createUser: ERROR: Invalid email'}
		}));
	}

	//generate a hashed password
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) return next({
			'log': 'User Controller: Create user - Encryption error',
			'message': { err : 'userController.createUser: ERROR: Encryption error'}
		});

		//if no error, then hash password using the new salt
		encryptPw = bcrypt.hash(password, salt, (err, hash) => {
			if (err) return next({
				'log': 'User Controller: Create user - Encryption error',
				'message': { err : 'userController.createUser: ERROR: Encryption error'}
			});


		});
	});

	

		//query for creating new user into database
		const query = `INSERT INTO "user" (first_name, last_name, email, username, password, address, zipcode) 
									 VALUES ($1, $2, $3, $4, $5, $6, $7) 
									 RETURNING _id, first_name, last_name, email, username, address, zipcode;`;
		const values = [first_name, last_name, email, username, encryptPw, address, zipcode];
		db.query(query, values)
				.then(response => {
					console.log('Created new user successfully');

					//create response object
					const verified = {
						isVerified: true,
						...response.rows[0]
					};

					res.locals.verified = verified;
					return next();
				})
				.catch(err => {
					return (next({
						'log': 'User Controller: Create user - Unable to create new user',
						'message': { err : 'userController.createUser: ERROR: Unable to create new user'}
					}))
				});

};


//verify user when provided with login credentials
/*
	use bcrypt to compare password with password stored in database
	return res.locals.verified object
	invoke next to pass to session middlewares
*/
userController.loginUser = (req, res, next) => {
	const { credentials } = req.body;
	const { username, password } = credentials;

	//check for inputs
	if(!username || !password) {
		return next({
			'log': 'User Controller: Create user - Missing login credentials',
			'message': { err : 'userController.createUser: ERROR: Missing login credentials'}
		})
	}

	const query = `SELECT _id, first_name, last_name, email, username, password, address, zipcode
								 FROM "user" WHERE username=$1 AND password=$2;`;
	const values = [username, password];
	
	db.query(query, values)
		.then(response => {

			const { _id, first_name, last_name, email, username, address, zipcode } = response.rows[0];
			const verified = {
					isVerified: true,
					_id, 
					first_name,
					last_name,
					email,
					username,
					address, 
					zipcode
				};

				res.locals.verified = verified;
				return next();
			})
			// bcrypt.compare(password, db_pass, (err, res)=> {
			// 	if (err) return next({
			// 		'log': 'User Controller: Login user - Incorrect password',
			// 		'message': { err : 'userController.loginUser: ERROR: Incorrect password'}					
			// 	})
			//})
		.catch(err => {
			return next({
				'log': 'User Controller: Login user - Could not find user',
				'message': { err : 'userController.loginUser: ERROR: Could not find user'}
			})
		})



};

module.exports = userController;