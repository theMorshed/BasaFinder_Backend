import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import OrderModel from "./request.model";
import { approveRequstService, createRequestService, deleteRequestService, getAllRequestService, getSingleRequestService, getTenantRequestService, rejectRequstService, updateRequestService, verifyPaymentService } from "./request.service";
import RentalRequest from "./request.model";

export const createRentalRequest = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await createRequestService(user, req.body, req.ip!);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Request created successfully',
        data: result
    });
});

export const verifyPayment = catchAsync(async (req, res) => {
    const order = await verifyPaymentService(req.params.order_id as string);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Order verified successfully",
        data: order,
    });
});


export const getAllRequest = catchAsync(async(req, res) => {
    const requests = await getAllRequestService();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Rental Request retrieved successfully',
        data: requests
    })
});

export const getSingleRequest = catchAsync(async(req, res) => {
    const { requestId } = req.params;
    const request = await getSingleRequestService(requestId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Request retrieved successfully',
        data: request
    })
});

export const updateRequest = catchAsync(async (req, res) => {
    const { requestId } = req.params;
    const request = await updateRequestService(requestId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'request updated successfully',
        data: request
    })
});

export const approveRequest = catchAsync(async (req, res) => {
    const { requestId } = req.params;
    const request = await approveRequstService(requestId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'request approved successfully',
        data: request
    })
});

export const rejectRequest = catchAsync(async (req, res) => {
    const { requestId } = req.params;
    const request = await rejectRequstService(requestId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'request rejected successfully',
        data: request
    })
});

export const deleteRequest = catchAsync(async (req, res) => {
    const { requestId } = req.params;
    const existingRequest = await RentalRequest.findById(requestId);
    const author = existingRequest?.tenant;

    const requestExists = await OrderModel.findOne({_id: requestId, user: author});
    if (!requestExists) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not the author of this blog!!');
    }

    await deleteRequestService(requestId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Request deleted successfully',
        data: null
    })
});

export const getTenantRequest = catchAsync(async(req, res) => {
    const { tenantId } = req.params;
    const requests = await getTenantRequestService(tenantId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Request retrieved successfully',
        data: requests
    })
});