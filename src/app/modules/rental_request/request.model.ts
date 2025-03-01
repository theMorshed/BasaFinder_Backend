import { Schema, Model, Types, model } from 'mongoose';
import { IRentalRequest } from './request.interface';

const rentalRequestSchema = new Schema<IRentalRequest>(
    {
        house: {
            type: Types.ObjectId,
            ref: 'House',
            required: [true, 'House ID is required']
        },
        tenant: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: 'Pending'
        },
        landlord_phone: {
            type: String,
            required: false
        },
        payment_status: {
            type: String,
            enum: ["Pending", "Paid", "Cancelled"],
            default: 'Pending'
        },
        transaction: {
            id: String,
            transactionStatus: String,
            bank_status: String,
            sp_code: String,
            sp_message: String,
            method: String,
            date_time: String,
        },
    },
    {
        timestamps: true
    }
);

// Create the Order model using the schema
const RentalRequest: Model<IRentalRequest> = model<IRentalRequest>('RentalRequest', rentalRequestSchema);

// Export the Order model to be used elsewhere in the application
export default RentalRequest;
