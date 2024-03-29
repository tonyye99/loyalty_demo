# Node.js Points Reward System Demo

### MySQL Database

This project uses MySQL as the database. Ensure you have MySQL installed and running on your system.

### Setup Environment Variables

Create a `.env` file in the root directory of the project and add necessary environment variables like `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, and `STRIPE_SECRET_KEY`.

```
PORT=8080

# Environment Name
NODE_ENV=development

DB_NAME=loyalty_demo_db
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PWD=

CLIENT_URL=http://localhost:8080

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Install Dependencies

Run `npm install` in the project's root directory to install the required dependencies.

### Database Setup

Run `npm run db:create` to create the database, `npm run db:migrate` to run migrations, and `npm run db:seed` to seed the database.

### Start the Server

Execute `npm run watch` to start the dev server and run the application.

### Step by Step Guide

1. Create a `.env` file in the root directory of the project and add necessary environment variables.
2. Run `npm install` in the project's root directory to install the required dependencies.
3. Run `npm run db:create` to create the database.
4. Run `npm run db:migrate` to run migrations.
5. Run `npm run db:seed` to seed the database.
6. Run `npm run watch` to start the dev server and run the application.
7. Create a product in `/product` route.
8. Create a cart in `/cart` route.
9. Add items to cart in `/cart/{id}/items` route.
10. Checkout the cart in `/cart/checkout` route. The stripe checkout session will be created and return as response.
11. Stripe local webhook server is needed to run before completing checkout session. So in another terminal run `stripe listen --forward-to localhost:8080/order/webhook/success`. Make sure you have stipe cli installed.
12. Go to that checkout session url in browser to complete the payment. Just use test card number 4242 4242 4242 4242. Order will be created in database with calculated points.
13. The other endpoints such as points transfer, product CRUD can be explored in the shared postman collection.
