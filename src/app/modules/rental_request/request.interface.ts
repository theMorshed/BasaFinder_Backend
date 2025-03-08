import { ObjectId } from 'mongoose';

export interface IRentalRequest {
    tenant: ObjectId;
    house: ObjectId;
    moveInDate: Date;
    rentalDuration: string;
    status: "pending" | "approved" | "rejected" | "approved-pending-payment" | "rented";
    landlordPhone?: string; // Visible after approval
    landlord: ObjectId; // Reference to the landlord
    paymentStatus: "pending" | "paid" | "cancelled";
    transaction?: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
};

