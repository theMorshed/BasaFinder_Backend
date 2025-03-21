/**
 * Import Statements
 * 
 * This section imports necessary modules, middlewares, and controllers:
 * - `Router` from Express: For defining API routes.
 * - `validateRequest`: Middleware for validating incoming requests.
 * - `login` and `register`: Controllers for handling login and registration logic.
 * - `loginSchema` and `registerUserSchema`: Validation schemas for user-related endpoints.
 */
import { Router } from 'express';
import { changePassword, getAllUser, getAUser, login, register, updateUser } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { changePasswordSchema, loginSchema, registerUserSchema, updateUserSchema } from './user.validation';
import auth from '../../middlewares/auth';

/**
 * User Routes
 * 
 * This section defines routes for user-related operations:
 * - Registration (`POST /register`): Validates input and calls the `register` controller.
 * - Login (`POST /login`): Validates input and calls the `login` controller.
 * 
 * Middleware:
 * - `validateRequest`: Ensures request bodies match the defined validation schemas.
 */
const router = Router();

/**
 * Route for user registration
 * - Validates the request body using `registerUserSchema`.
 * - Calls the `register` controller to handle the request.
 */
router.post('/register-user', validateRequest(registerUserSchema), register);

/**
 * Route for user login
 * - Validates the request body using `loginSchema`.
 * - Calls the `login` controller to handle the request.
 */
router.post('/login', validateRequest(loginSchema), login);
router.post("/change-password", auth('admin', 'tenant', 'landlord'), validateRequest(changePasswordSchema), changePassword);

router.get('/', getAllUser);
router.get('/:userId', getAUser);
router.put('/:userId', validateRequest(updateUserSchema), updateUser);

/**
 * Export User Routes
 * 
 * Exports the `userRoutes` object containing all user-related routes.
 */
export const userRoutes = router;