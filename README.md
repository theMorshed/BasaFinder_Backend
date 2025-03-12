# BasaFinder Backend Application

This is a simple application for managing a House rent. It includes functionalities for managing houses and handling landlord and tenants. The application uses **MongoDB**, **Express**, **Node.js**, and **TypeScript** to provide a complete solution for managing houses and rental requests in the application.

## Features

-   **House Management:**

    -   Create, read, update, and delete house.
    -   Search for house by location, price, or bedrooms.
    -   Display details for individual house.

-   **Requests Management:**

    -   Place orders for house.
    -   Track orders based on customer email and house details.
    -   Reduce stock and manage inventory when an order is placed.

-   **Inventory Management:**

    -   Automatically update stock levels after an request is placed.
    -   Set a product’s status to "Out of Stock" when inventory reaches zero.

-   **Revenue Calculation:**
    -   Calculate the total revenue generated from all orders using MongoDB aggregation.

## Technologies Used

-   **Node.js** – JavaScript runtime built on Chrome's V8 JavaScript engine.
-   **Express** – Web application framework for Node.js.
-   **MongoDB** – NoSQL database used to store products and orders.
-   **Mongoose** – ODM (Object Document Mapper) for MongoDB.
-   **TypeScript** – A superset of JavaScript that adds static types.
-   **Dotenv** – A module for loading environment variables from a `.env` file.
-   **CORS** – Middleware for enabling Cross-Origin Resource Sharing.

## Requirements

Before running the project locally, make sure you have the following installed:

-   **Node.js** – Version 16.x or higher
-   **MongoDB** – Local or cloud instance (e.g., MongoDB Atlas)

## Setting Up the Project Locally

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/theMorshed/BasaFinder_Backend.git
```

### 2. Install Dependencies

Navigate to the project directory and install all required dependencies:

```bash
cd BasaFinder_Backend
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory of the project, and set the following environment variables:

```bash
PORT=5000
DATABASE_URL=mongodb://localhost:27017/BasaFinder_Backend(you will get this api from mongodb atlas)
```

-   **PORT:** – The port on which the server will run.
-   **DATABASE_URL:** – Your MongoDB connection URL (can be a local MongoDB instance or a MongoDB Atlas connection string).

### 4. Run the Application

Start the development server by running the following command:

```bash
npm run start:dev
```

This will start the server on the port specified in your .env file (default: 5000).

### 5. Access the Application

Once the server is running, you can access the application API at:

```bash
http://localhost:5000
```

## 6. API Endpoints

### Tenants:

-   **POST** /tenants/requests: Create a new rental request for a house.
-   **GET** /tenants/requests: Retrieve all rental requests submitted by the tenant.
-   **PUT** /tenants/profile: Update tenant profile.

### Landlords:

-   **POST** /landlords/listings: Create a new rental house listing.
-   **GET** /landlords/listings: Retrieve all rental listings posted by the landlord.
-   **PUT** /landlords/listings/:id: Update a specific rental listing.
-   **DELETE** /landlords/listings/:id: Remove a rental listing.
-   **GET** /landlords/requests: Retrieve all rental requests for the listings posted by the -  landlord.
-   **PUT** /landlords/requests/:id: Respond to a rental request by approving or rejecting it. If approved: The payment process initiate and a simple input field appears for the landlord to enter their phone number. This number is saved and made available to the tenant.

### Admin: 

-   **GET** /admin/users: Retrieve all user(tenants, landlords) accounts.
-   **PUT** /admin/users/:id: Update user roles.
-   **DELETE** /admin/user/:id: Delete user.
-   **GET** /admin/listings: Retrieve all rental house listings.
-   **PUT** /admin/listings/:id: Update or moderate a rental listing.
-   **DELETE** /admin/listings/:id: Remove a rental listing if necessary.

## Development & Contribution

-   Fork the repository to your own GitHub account.
-   Clone your fork to your local machine.
-   Create a new branch for your changes.
-   Make your changes and commit them.
-   Push your changes and create a pull request.

We welcome contributions and improvements! If you have suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

-   Special thanks to [MongoDB](https://www.mongodb.com/) for providing the database solution.
-   Thank you to the developers of the libraries and tools used in this project:
    -   [Express](https://expressjs.com/) - Web framework for Node.js
    -   [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
    -   [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file
    -   [CORS](https://www.npmjs.com/package/cors) - Middleware to enable Cross-Origin Resource Sharing
    -   [Node.js](https://nodejs.org/en/) - JavaScript runtime
