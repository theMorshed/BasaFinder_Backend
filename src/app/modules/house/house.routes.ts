import express from 'express';
import { productControllers } from './house.controller';

// Create an instance of the express Router
const router = express.Router();

/**
 * Endpoint to create a new bike product.
 * Method: POST
 * Route: /api/products
 * Controller: productControllers.createProduct
 * Description: This route handles the creation of a new bike product in the database.
 */
router.post('/create-bike', productControllers.createBike);

/**
 * Endpoint to get all bikes in the database.
 * Method: GET
 * Route: /api/products
 * Controller: productControllers.getAllBikes
 * Description: This route fetches a list of all bike products, including their details.
 * Query parameter: Optional searchTerm to filter by name, brand, or category.
 */
router.get('/', productControllers.getAllBikes);

/**
 * Endpoint to get a specific bike product by its ID.
 * Method: GET
 * Route: /api/products/:productId
 * Controller: productControllers.getSingleBike
 * Description: This route fetches a single bike product based on the provided productId.
 * Path parameter: productId - The ID of the bike product.
 */
router.get('/:productId', productControllers.getSingleBike);

/**
 * Endpoint to update a bike product's details.
 * Method: PUT
 * Route: /api/products/:productId
 * Controller: productControllers.updateBike
 * Description: This route updates the details of a specific bike product.
 * Path parameter: productId - The ID of the bike product to be updated.
 */
router.put('/:productId', productControllers.updateBike);

/**
 * Endpoint to delete a bike product.
 * Method: DELETE
 * Route: /api/products/:productId
 * Controller: productControllers.deleteBike
 * Description: This route deletes a bike product from the database.
 * Path parameter: productId - The ID of the bike product to be deleted.
 */
router.delete('/:productId', productControllers.deleteBike);

// Export the router so it can be used in the main app file
export const productRouter = router;
