const { request } = require('express');
let db = require('../../database/dbConnection');
if (process.env.NODE_ENV === 'test'){
	db = require('../../database/testdb');
}


const productController = {};

//Retrieve all products from the database where the purchased boolean is false
productController.getProducts = (req, res, next) => {
	const query = 'SELECT * FROM "product" WHERE purchased=false;'
	db.query(query)
		.then(response => {
			console.log('getProducts', response)
			res.locals.products = response.rows;
			return next();
		})
		.catch(err => {
			return next({
				log: 'Product Controller: get Products - could not get products',
				message: {err: 'could not get products'}
			})
		})
};

/*

innput: order: { products: [...ids], buyer_id: num }
When user makes an order, retrieve the order_id. Iterate through
the products array and for each product, update the purchased boolean and order_id
*/


//for each product in product array, update the purchased boolean and order_id
productController.buyProducts = (req, res, next) => {
	//destructure products array and order id
	const { products } = req.body.order;
	const { _id } = res.locals.order;

	console.log('products in buyProducts', products);

	let productQuery = `UPDATE product SET purchased='true', order_id=${_id} WHERE _id IN (`;
	for (let i = 0; i < products.length; i++){
		productQuery += products[i];
	}
	productQuery += ');'

	console.log('inbuyproducts', productQuery);

	// const productIds = products.map(product => product._id);
	
	//update order_id and purchased for each product
	// const query = `UPDATE product SET purchased=true, order_id=${_id} WHERE _id IN ${products};`;

	db.query(productQuery)
	.then(response => {
		return next();
	})
	.catch(err => {
		return next({
			log: 'productController.buyProducts:  - unable to update products as purchased',
			message: { err : 'could not buy products'}
		})
	})
		
}


module.exports = productController;