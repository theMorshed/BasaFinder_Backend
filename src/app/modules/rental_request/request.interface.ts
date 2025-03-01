import { ObjectId } from 'mongoose';

export interface IRentalRequest {
    house: ObjectId;
    tenant: ObjectId;
    status: "Pending" | "Approved" | "Rejected";
    landlord_phone: string;
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    payment_status: "Pending" | "Paid" | "Cancelled";
}
