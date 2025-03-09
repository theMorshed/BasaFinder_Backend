import { Schema, Model, Types, model } from 'mongoose';
import { IRentalRequest } from './request.interface';

const rentalRequestSchema = new Schema<IRentalRequest>(
    {
        house: {
            type: Types.ObjectId,
            ref: 'House',
            required: [true, 'House ID is required'],
        },
        tenant: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'Tenant ID is required'],
        },
        landlord: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'Tenant ID is required'],
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "approved-pending-payment", "rented"],
            default: "pending",
        },
        moveInDate: {
            type: Date,
            required: [true, 'Move-in date is required'],
        },
        rentalDuration: {
            type: String, // Example: "6 months", "1 year"
            required: [true, 'Rental duration is required'],
        },
        landlordPhone: {
            type: String,
            required: false, // Only visible after approval
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "cancelled"],
            default: "pending",
        },
        transaction: {
            id: { type: String, required: false },
            transactionStatus: { type: String, required: false },
            bank_status: { type: String, required: false },
            sp_code: { type: String, required: false },
            sp_message: { type: String, required: false },
            method: { type: String, required: false },
            date_time: { type: String, required: false },
        },
    },
    {
        timestamps: true, // Auto-adds `createdAt` and `updatedAt`
    }
);

const RentalRequest: Model<IRentalRequest> = model<IRentalRequest>('RentalRequest', rentalRequestSchema);

export default RentalRequest;
