const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');

//User gets all products to be rendered on a page
/*
	retrieve all products
*/
router.get('/products', 
	productController.getProducts,
	(req, res)=> {
		return res.status(200).json({products: res.locals.products});
});



//User purchases a product(s)
/*
	generate new order entry with user, shipping status of pending, cost and date
		send order number in order obj
		store new order in res.locals.order
		store order history in res.locals.history

	for each product, 
		update purchased boolean to true
		update order_id to match order number

	return res.locals.order and res.locals.history
*/
router.post('/purchase',
	// orderController.createOrder,
	// orderController.getOrders,
	// productController.buyProducts,
	(req, res)=> {
		return res.status(200).json({order: res.locals.order, history: res.locals.history});
});


//User adds a product to sell
/*
	add product w/ req fields to database
*/
// router.post('/product', 
// (req, res)=> {
// 	return res.status(200).json({products: res.locals.products});
// });


//User cancels purchase
/*

	retrieve order list and save into res.locals.order and delete entry (orderController)
	retrieve new order list for user and save into res.locals.history (orderController)
	update purchased boolean values to false and remove order_id (productController)
	return res.locals.order

*/
// router.delete('/purchase', 
// (req, res)=> {
// 	//retrieve purchase list
// 	//change 
// 	return res.status(200).json({order: res.locals.order, history: res.locals.history});
// });



module.exports = router;
