/**
 * Import Statements
 * 
 * This section imports necessary modules and models:
 * - `User` from `user.model`: The Mongoose model for user operations.
 * - `TUser` from `user.types`: Type definition for the user entity.
 * - `bcryptjs`: For hashing and comparing passwords.
 * - `jsonwebtoken`: For generating and verifying JWT tokens.
 */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import User from "./user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from "./user.interface";
import config from "../../config";

/**
 * Service for User Registration
 * 
 * This function handles user registration by:
 * - Checking if a user with the provided email already exists.
 * - Creating a new user if no conflict is found.
 * 
 * @param payload - The user data containing `name`, `email`, `password`, etc.
 * @returns The newly created user object.
 * @throws AppError if the user already exists.
 */
export const registerService = async (payload: IUser) => {
    const { email } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User already exists');
    }

    const result = await User.create(payload);
    return result;
};

/**
 * Service for User Login
 * 
 * This function handles user login by:
 * - Validating the provided email and password.
 * - Generating a JWT token upon successful authentication.
 * 
 * @param email - The email address of the user attempting to log in.
 * @param password - The password provided for authentication.
 * @returns An object containing the authenticated user and the generated JWT token.
 * @throws Error if the email is not found or the password is incorrect.
 */
export const loginService = async (email: string, password: string) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid Email');
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Wrong password input');
    }

    // Generate a JWT token
    const accessToken = jwt.sign({ id: user?._id, role: user?.role, email: user?.email, phone: user?.phoneNumber }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ id: user?._id, role: user?.role, email: user?.email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

    return { user, accessToken, refreshToken };
};

export const changePasswordService = async(email: string, payload: any) => {
    const { currentPassword, newPassword, confirmPassword } = payload;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid Email');
    }
    console.log(currentPassword, user.password);

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Wrong password input');
    }

    // Validate new passwords
    if (newPassword !== confirmPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'New passwords do not match');
    }

    // this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
    const result = await User.findOneAndUpdate({ email }, { password: hashedPassword });

    return null;
}


/**
 * Service for retrieve User
 * This function handles retrieve User:
*
 * @returns An object containing the all users.
 * @returns An empty object if user doesn't exists.
 */
export const getAllUserService = async() => {
    const users = await User.find({});
    return users;
}


export const getAUserService = async(userId: string) => {
    const user = await User.findById(userId);
    return user;
}

export const updateUserService = async (userId: string, payload: Partial<IUser>) => {
  // Find the house by ID and update it with the new data
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });
  return result;
}