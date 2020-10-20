<h1 align="center">ExpressJS - Michi RESTfull API</h1>

Michi is application point of sale for cashier. Michi app simplify the process of selling your business and manage transactions more efficiently. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.2-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #database_name, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
DB_PASS=          // Database password
DB_USER=root      // Database user
DB_NAME=online_shop   // Database name
```

## End Point

**1. GET**

- `/product` (Get all product)

  - `{ "page": 1, "limit": 3, "sort" : "product_name DESC" }`

- `/product/search` (Get product by name)

  - `{ "keyword": "coffee" }`

- `/product/:id` (Get product by id)

- `/category` (Get all category)

- `/category/search` (Get category by name)

  - `{ "keyword": "drink" }`

- `/category/:id` (Get category by id)

- `/orders` (Get all order)

  - `{ "page": 1, "limit": 3, "sort" : "order_id ASC" }`

- `/orders/:id` (Get order by id)

- `/history` (Get all history)

  - `{ "page": 1, "limit": 3, "sort" : "history_created_at ASC" }`

- `/history/:id` (Get history by id)

- `/users` (Get all user)

**2. POST**

- `/product` (Post product)

  - `{ "product_name": "Milk Tea", "category_id": 1, "product_harga": 24000 , "product_status" : 1 | 0}`

- `/category` (Post category)

  - `{ "category_name": "Snack" }`

- `/order` (Post order)

  - `{ "orders": [{ "product_id": 1, "qty": 2 }, { "product_id": 7, "qty": 2 }] }`

- `/users/register` (Post User Register)

  - `{ "user_email": "arizal123@gmail.com", "user_password": "12345678", "user_name": "arizal123" }`

- `/users/login` (Post User Login)
  - `{ "user_email": "arizal123@gmail.com", "user_password": "12345678" }`

**3. PATCH**

- `/product/:id` (Update product by id)

  - `{"product_name" : "Lemon Tea", "category_id" : 2, "product_harga" : 12000, "product_status" : 1 | 0}`

- `/category/:id` (Update category by id)

  - `{ "category_name": "Noodles" }`

- `/users/:id` (Update user by id)
  - `{ "user_name": "arizal321", "user_role": 1 | 2, "user_status": 0 | 1 }`

**4. DELETE**

- `/product/:id` (Delete product by id)

- `/category/:id` (Delete category by id)
