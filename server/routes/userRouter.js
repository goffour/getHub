const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

//User signs up
/*
signup credentials will be extracted and writted into the database in the userController
redirect to cookie controller to provide cookie
return verified object
*/

router.post('/signup', 
	userController.createUser,
	cookieController.setSSIDCookie, 
	orderController.getOrders,
	(req, res)=> {
		return res.status(200).json({verified: res.locals.verified, history: res.locals.history});
});


//User logs in 
/*
login credentials will be extracted and compared to database
redirect to cookie controller to provide cookie
return verified object and order object
*/

router.post('/login',
	userController.loginUser,
	cookieController.setSSIDCookie,
	orderController.getOrders,
	(req, res) => {
		return res.status(200).json({verified: res.locals.verified, history: res.locals.history});
}); 


//Logout functionality

module.exports = router;
