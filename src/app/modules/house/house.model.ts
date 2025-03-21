import mongoose, { Schema } from "mongoose";
import { IHouse } from "./house.interface";

// Define the schema for the House
const houseSchema = new mongoose.Schema<IHouse>(
    {
        landlord: {
            type: Schema.Types.ObjectId,
            required: [true, 'Landlord id is required'],  // ID must be provided
        },
        // The location of the house
        location: {
            type: String,
            required: [true, 'Location is required'],  // Location must be provided
            trim: true  // Trim spaces around the location
        },

        // The description of the house
        description: {
            type: String,
            required: [true, 'Description is required'],  // Description must be provided
            trim: true  // Trim spaces around the description
        },

        // The rent amount of the house
        rentAmount: {
            type: Number,
            required: [true, 'Rent amount is required'],  // Price must be provided
            min: [0, 'Rent amount must be a positive number'],  // Price must be greater than or equal to 0
        },

        // The Bedrooms number of the house
        bedrooms: {
            type: Number,
            required: [true, 'Bedrooms number is required'],  // Number must be provided
            min: [0, 'Bedrooms number must be a positive number'],  // Number must be greater than or equal to 0
        },

        amenities: {
            type: [String],
            required: [true, 'Amenities is required'],
            default: []
        },

        images: {
            type: [String],
            required: [true, 'Images is required'],
            default: []
        },
    },
    {
        timestamps: true  // Automatically create "createdAt" and "updatedAt" fields
    }
);

// Create the model using the schema
const House = mongoose.model('House', houseSchema);

// Export the House to use it in other parts of the application
export default House;
