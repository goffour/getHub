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
				"zipcode" VARCHAR(255),
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


		//populate test database with one fake product
		const createTestProduct = `
			INSERT INTO product (description, category, price, purchased)
			VALUES ('tarzan', 'dvds', 10.99, false);
		`;
		await db.query(createTestProduct);
	});

	//afterAll to drop user, order, and product tables

	//describe route integration
	describe('Route integration', () => {

		//The server should serve the initial index.html page

		describe('/', () => {
			describe('GET', ()=> {
				it('should return status of 200 and a content-type of text/html', async () => {
					const response = await request(server)
							.get('/')
					expect(response.headers['content-type']).toMatch(/text\/html/);
				});
			});
		});

		//user routes include signup and login and returns an object containing verified and history
		//res.cookie corresponds to user_id
		describe('/user', ()=> {
			describe('/signup', () => {
				//responds with a verified object containing credentials and order history
				xit('responds with 200 status and application/json content type', async () => {
					const response = await request(server)
						.post('/user/signup')
						.send({
							credentials: {
							first_name: 'phil',
							last_name: 'collins',
							email: 'tarzan@pc.com',
							username: 'realphilcollins',
							password: '123'
						}})
						.set('Accept', 'application/json');
						console.log(response.body);
					expect(response.headers['content-type']).toMatch(/json/);
					expect(response.status).toEqual(200);
					expect(response.body.verified.isVerified).toBe(true);
					expect(response.body.verified.first_name).toBe('phil');
					expect(response.body.verified.last_name).toBe('collins');
					expect(response.body.verified.email).toBe('tarzan@pc.com');
				});


				xit('responds to invalid request with 500 status', async () => {
						const response = await request(server)
							.post('/user/signup')
							.send('bad-request')
							.set('Accept', 'application/json');
						expect(response.headers['content-type']).toMatch(/json/);
						expect(response.status).toEqual(500);		
				});

			});

			describe('/login', () => {
				// responds with a verified object containing credentials and order history
				it('responds with 200 status and application/json content type', async () => {
					const response = await request(server)
						.post('/user/login')
						.send({credentials: {
							username: 'realphilcollins',
							password: '123'
						}})
						.set('Accept', 'application/json');
					expect(response.headers['content-type']).toMatch(/json/);
					expect(response.status).toEqual(200);
					expect(response.body.verified.isVerified).toBe(true);
					expect(response.body.verified.first_name).toBe('phil');
					expect(response.body.verified.last_name).toBe('collins');
					expect(response.body.verified.email).toBe('tarzan@pc.com');
				});

				xit('responds to invalid request with 500 status and error message in body', async () => {
					const response = await request(server)
					.post('/user/login')
					.send('bad-request')
					.set('Accept', 'application/json');
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.status).toEqual(500);		
				});

			});

		});


		//products route include products and purchase. Getting products will retrieve all products in inventory for sale
		describe('/products', ()=> {
			describe('GET /products', () => {
				it('responds with 200 status and application/json content type with an array containing product objects',
				 async () => {
					const response = await request(server)
					.get('/products/products')
					expect(response.status).toEqual(200);
					expect(response.headers['content-type']).toMatch(/json/);
					expect(response.body.products[0]).toEqual({
						description: 'tarzan',
						category: 'dvds',
						price: 10.99,
						purchased: 'false',
					});
			 	});
				it('does not return products that are already purchased', async () => {
					const response = await request(server)
					.get('/products/products')
					expect(response.body.products[0].purchased).toEqual('false');
				});

				xit('responds to invalid request with 500 status', async () => {
					const response = await request(server)
					.post('/products/products')
					.send('bad-request')
					.set('Accept', 'application/json');
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.status).toEqual(500);
			 	});
			});
			//purchase will create an order and return an obj containing order and history
			describe('POST /purchase', () => {
				it('responds with 200 status and application/json content type with object containing order and history',
				 async () => {
					const response = await request(server)
					.post('/products/purchase')
					.send({
						//array of product ids
						products: [1],
						//buyer user id
						buyer_id: 1,
					})
					.set('Accept', 'application/json');
					expect(response.status).toEqual(200);
					expect(response.headers['content-type']).toMatch(/json/);
					expect(response.body.order).toEqual({
						confirmed: true,
						_id: 1,
						buyer_id: 1,
						shipping_status: 'pending',
						cost: 10.99,
						date: new Date()
					})
			 	});

				//add to test that purchased object is updated in database as purchased = true?

			 	xit('responds to invalid request with 500 status', async () => {
					const response = await request(server)
					.post('/products/purchase')
					.send('bad-request')
					.set('Accept', 'application/json');
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.status).toEqual(500);
			 	});
			});

		})

	});
});
