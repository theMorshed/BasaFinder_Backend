/**
 * Import necessary modules and utilities for user authentication, response handling, and service functions.
 * 
 * - `StatusCodes`: Provides HTTP status codes for consistent response formatting.
 * - `catchAsync`: A utility to handle asynchronous errors in Express controllers.
 * - `sendResponse`: A utility to send structured JSON responses.
 * - `loginService`: Service function for handling user login logic.
 * - `registerService`: Service function for handling user registration logic.
 */
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { changePasswordService, getAllUserService, getAUserService, loginService, registerService, updateUserService } from "./user.service";

/**
 * Controller function to handle user registration.
 * 
 * This function receives the user's registration data from the request body, 
 * processes it through the `registerService`, and sends a structured response with 
 * the user's details (excluding sensitive data) upon successful registration.
 * 
 * @param req - The Express request object containing the registration data in the body.
 * @param res - The Express response object to send the response.
 * @returns A JSON response with the status code 201, a success message, and the user's details.
 */
export const register = catchAsync(async (req, res) => {
    const user = await registerService(req.body);
    const result = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
    }

    sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: StatusCodes.CREATED,
        data: result
    })
});


export const updateUser = catchAsync(async(req, res) => { 
    const { userId } = req.params;   
    const userData = req.body;
    const result = await updateUserService(userId, userData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `User-${userId} updated successfully`,
        data: result
    })
});

/**
 * Controller function to handle user login.
 * 
 * This function receives the user's login credentials (email and password) from 
 * the request body, processes the login through the `loginService`, and returns 
 * a JSON response with a JWT token for successful login.
 * 
 * @param req - The Express request object containing the login credentials in the body.
 * @param res - The Express response object to send the response.
 * @returns A JSON response with the status code 200, a success message, and a token.
 */
export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await loginService(email, password);

    res.status(200).json({
        success: true,
        message: 'Login successful',
        statusCode: StatusCodes.OK,
        data: {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            user: user
        }
    })
});

export const changePassword = catchAsync(async(req, res) => {     
    const userEmail = req.user?.email; // Assuming req.user is set via auth middleware
    const result = await changePasswordService(userEmail, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Password changed successfully`,
        data: result
    })
});

export const getAllUser = catchAsync(async (req, res) => {
    const users = await getAllUserService();

    res.status(200).json({
        success: true,
        message: 'All Users retrived sucessfully',
        statusCode: StatusCodes.OK,
        data: users
    })
});

export const getAUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const user = await getAUserService(userId);

    res.status(200).json({
        success: true,
        message: 'User retrived sucessfully',
        statusCode: StatusCodes.OK,
        data: user
    })
});