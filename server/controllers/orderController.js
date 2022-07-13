const { request } = require('express');
const db = require('../../database/dbConnection');


const orderController = {};

//create new entry in order
/*
create new entry in order table, object form to be:

_id, 
buyer_id,
shipping_status
cost (calculated on front end?, loop thru and add prices from array?)
date created on

store return object in res.locals.order
*/
orderController.createOrder = (req, res, next) => {


};

//retrieve orders for a certain user with user_id and store in res.locals.history
orderController.getOrders = (req, res, next) => {
	res.locals.history = {};
	return next();
}


module.exports = orderController;