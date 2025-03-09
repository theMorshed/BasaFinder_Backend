import OrderModel from "./request.model";
import ProductModel from "../house/house.model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { orderUtils } from "./request.utils";
import { IUser } from "../user/user.interface";
import { IRentalRequest } from "./request.interface";
import RentalRequest from "./request.model";

export const createRequestService = async (user: IUser, payload: IRentalRequest, client_ip: string) => {

    const rentalRequest = await RentalRequest.create(payload);
    return rentalRequest;
    
    // payment integration
    // const shurjopayPayload = {
    //     amount: totalPrice,
    //     order_id: order._id,
    //     currency: "BDT",
    //     customer_name: user.name,
    //     customer_address: "Chandanaish, chattagram",
    //     customer_email: user.email,
    //     customer_phone: "123456789",
    //     customer_city: "Chattagram",
    //     client_ip,
    // };

    // const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
    // console.log(payment);

    // if (payment?.transactionStatus) {
    //     order = await order.updateOne({
    //         transaction: {
    //             id: payment.sp_order_id,
    //             transactionStatus: payment.transactionStatus,
    //         },
    //     });
    // }

    // return payment.checkout_url;
};

export const verifyPaymentService = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

export const getAllRequestService = async () => {
    const rentalRequest = await RentalRequest.find({}).populate('tenant', ['name', 'email']).populate('house', ['location', 'rent_amount']);
    return rentalRequest;
}

export const getSingleRequestService = async(requestId: string) => {
    const rentalRequest = await RentalRequest.findById(requestId).populate('tenant', ['name', 'email']).populate('house', ['location', 'rent_amount']);
    return rentalRequest;
}

export const updateRequestService = async(requestId: string, payload: Partial<IRentalRequest>) => {
    const existingRequest = await RentalRequest.findById(requestId);
    const author = existingRequest?.tenant;

    const requestExists = await RentalRequest.findOne({_id: requestId, user: author});
    if (!requestExists) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not the author of this request!!');
    }

    const rentalRequest = await RentalRequest.findByIdAndUpdate(requestId, payload, { new: true });
    return rentalRequest;
}

export const approveRequstService = async(requestId: string) => {
  const rentalRequest = await RentalRequest.findById(requestId);
  if (!rentalRequest) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Request not found');
  }

  rentalRequest.status = "approved-pending-payment";
  // rentalRequest.landlordPhone = req.user.phone; // Assuming landlord is logged in
  const result = await rentalRequest.save();

  return result;
}

export const rejectRequstService = async(requestId: string) => {
  const rentalRequest = await RentalRequest.findById(requestId);
  if (!rentalRequest) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Request not found');
  }

  rentalRequest.status = "rejected";
  // rentalRequest.landlordPhone = req.user.phone; // Assuming landlord is logged in
  const result = await rentalRequest.save();

  return result;
}

export const deleteRequestService = async(id: string) => {
    const rentalRequest = await RentalRequest.findByIdAndDelete(id);
    return rentalRequest;
}

export const getTenantRequestService = async(tenantId: string) => {
    const rentalRequest = await RentalRequest.find({tenant: tenantId}).populate('tenant', ['name', 'email']).populate('house', ['location', 'rentAmount']);
    return rentalRequest;
}

export const getLandlordRequestService = async(landlordId: string) => {
    const rentalRequest = await RentalRequest.find({landlord: landlordId}).populate('tenant', ['name', 'email']).populate('house', ['location', 'rentAmount']);
    return rentalRequest;
}