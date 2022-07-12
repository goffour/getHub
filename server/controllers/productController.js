const { request } = require('express');
const db = require('../../database/dbConnection');


const productController = {};

//Retrieve all products from the database where the purchased boolean is false
productController.getProducts = (req, res, next) => {

};

/*
When user makes an order, retrieve the order_id. Iterate through
the products array and for each product, update the purchased boolean and order_id
*/
productController.buyProducts = (req, res, next) => {

};


module.exports = productController;