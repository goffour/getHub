//require the databases
const db = require('../database/testdb');
const request = require('supertest');
const { doesNotMatch } = require('assert');
const server = 'http://localhost:3000';

describe('Server function tests', () => {

	//beforeAll create user, order, and product tables
	beforeAll(async() => {

		//dropAllTables
		const dropAllTables = `
			DROP TABLE IF EXISTS "user";
			DROP TABLE IF EXISTS "order";
			DROP TABLE IF EXISTS "product";
		`;

		//query to dropAllTables
		await db.query(dropAllTables);

		//create userTable
		const createUserTable = `
			CREATE TABLE "user" (
				"_id" SERIAL PRIMARY KEY,
				"first_name" VARCHAR(255),
				"last_name" VARCHAR(255),
				"email" VARCHAR(255),
				"username" VARCHAR(255),
				"password" VARCHAR(255),
				"address" VARCHAR(255),
				"zipcode" VARCHAR(255)
				CONSTRAINT user_username_email_key UNIQUE (username, email)
			);
		`;

		//create orderTable
		const createOrderTable = `
			CREATE TABLE "order" (
				"_id" SERIAL PRIMARY KEY,
				"buyer_id" INTEGER,
				"shipping_status" VARCHAR(255),
				"cost" NUMERIC,
				"date" TIMESTAMP
			);
		`;

		//create productTable
		const createProductTable = `
			CREATE TABLE "product" (
				"_id" SERIAL PRIMARY KEY,
				"seller_id" INTEGER,
				"description" VARCHAR(255),
				"category" VARCHAR(255),
				"price" NUMERIC,
				"purchased" BOOLEAN,
				"order_id" INTEGER,
				"file_location" VARCHAR(255)
			);
		`;

		//queries to create tables
		await db.query(createUserTable);
		await db.query(createOrderTable);
		await db.query(createProductTable);
	});

	//afterAll to drop user, order, and product tables

	//describe route integration
	describe('Route integration', () => {

		//The server should serve the initial index.html page
		describe('/', ()=> {
			// describe('GET', () => {
			// 	it('responds with 200 status and text/html content type', () => {

			// 	});

			// 	xit('responds to invalid request with 400 status and error message in body', () => {

			// 	});
			// })
		});

		//user routes include signup and login and returns an object containing verified and history
		//res.cookie corresponds to user_id
		describe('/user', ()=> {
			// describe('/signup', () => {
			// 	it('responds with 200 status and application/json content type', () => {

			// 	});

			// 	xit('responds with a verified object containing credentials and order history', ()=> {

			// 	});

			// 	xit('responds to invalid request with 500 status and error message in body', () => {
			
			// 	});

			// });

			// describe('/login', () => {
			// 	it('responds with 200 status and application/json content type', () => {
				
			// 	});

			// 	xit('responds with a verified object containing credentials and order history', ()=> {
					
			// 	});

			// 	xit('responds to invalid request with 500 status and error message in body', () => {

			// 	});

			// });

		});


		//product routes include products and purchase. Getting products will retrieve all products in inventory for sale
		//purchase will create an order and return an obj containing order and history
		describe('/products', ()=> {
			// describe('GET /products', () => {
			// 	it('responds with 200 status and application/json content type with object containing products', ()=> {

			// 	});

			// 	xit('responds to invalid request with 500 status and error message in body', () => {

			// 	});
			// });

			// describe('POST /purchase', ()=> {
			// 	it('responds with 200 status and application/json content type with object containing order and history', () => {

			// 	});

			// 	xit('responds to invalid request with 500 status and error message in body', () => {

			// 	});
			// });

		})

	});
});
