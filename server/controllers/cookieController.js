const { request } = require('express');
const db = require('../../database/dbConnection');


const cookieController = {};

//Send cookie with user_id
cookieController.setSSIDCookie = (req, res, next) => {
	const { _id } = res.locals.verified
	res.cookie('ssid', _id);
	return next();
};

module.exports = cookieController;