const { request } = require('express');
let db = require('../../database/dbConnection');
if (process.env.NODE_ENV === 'test'){
	db = require('../../database/testdb');
}

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

	//destructure products array and buyer_id
	const { buyer_id, cost, date } = req.body.order;

	console.log('in create order', buyer_id)

	//generate new order entry in order table
	const query = `INSERT INTO "order" (buyer_id, shipping_status, cost, date)
									VALUES ($1, $2, $3, $4)
									RETURNING _id, buyer_id, shipping_status, cost, date`;

	const values = [buyer_id, 'pending', cost, date];

	db.query(query, values)
		.then(response => {
			console.log('Placed order successfully', response.rows[0]);

			const order = {
				confirmed: true, 
				...response.rows[0]
			}
			res.locals.order = order;
			return next();
		})
		.catch(err => {
			return next({
				'log': 'Product Controller:  - Unable to place order',
				'message': { err : 'productController.placeOrder: ERROR: Unable to place order'}
			})
		})
	

};

//retrieve orders for a certain user with user_id and store in res.locals.history

orderController.getOrderList = (req, res, next) => {

	const { _id } = res.locals.verified;
	const query = `SELECT * FROM "order" WHERE buyer_id=${_id}`;
	db.query(query)
		.then(response => {
			console.log('in getOrderList', response);

			res.locals.history = response.rows;
			return next();
		})
		.catch(err => {
			return next({
				log: 'Order Controller: getOrderList - could not retreive order list',
				message: {err: 'could not retrieve order list'}
			})
		});

}

orderController.updateOrderList = (req, res, next) => {

	const { buyer_id } = req.body.order;
	
	const query = `SELECT * FROM "order" WHERE buyer_id=${buyer_id}`;
	db.query(query)
		.then(response => {
			console.log('in updateOrderList', response.rows);

			res.locals.history = response.rows;
			return next();
		})
		.catch(err => {
			return next({
				log: 'Order Controller: updateOrderList - could not retreive updated order list',
				message: {err: 'could not updated order list'}
			})
		});
}

module.exports = orderController;