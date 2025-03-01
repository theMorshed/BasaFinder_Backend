// Import necessary modules
import express, { Application, NextFunction, Request, Response } from 'express'  // Express and Application types for creating the app
import cors from 'cors';  // CORS middleware for enabling cross-origin resource sharing
import orderRouter from './app/modules/rental_request/request.routes';  // Router for order-related routes
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { userRoutes } from './app/modules/user/user.routes';
import { productRouter } from './app/modules/house/house.routes';

// Initialize the Express application
const app: Application = express();

// Middleware setup
// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
// app.use(cors({ origin: ['https://bikestorefrontend.vercel.app'], credentials: true }));

// API Routes setup
// Routes for product-related operations like creating and fetching products
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/user', userRoutes);

// Root route that sends a simple "Hello, World!" message
app.get('/', (req, res) => {
    res.send('BasaFinder API run successfully');
})

app.use(globalErrorHandler);
app.use(notFound);

export default app;
