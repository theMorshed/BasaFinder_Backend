import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from 'http-status-codes';
import { createHouseService, deleteHouseByIDService, getAllHouseService, getAllLandlordHouseService, getHouseByIDService, updateHouseByIDSevice } from "./house.service";

export const createHouse = catchAsync(async(req, res) => {    
    const result = await createHouseService(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'House created successfully',
        data: result
    })
});

export const getAllHouses = catchAsync(async(req, res) => {    
    const searchTerm = req.query.searchTerm as string | undefined;
    const houses = await getAllHouseService(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'House retrieved successfully',
        data: houses
    })
});

export const getAllLandlorHouses = catchAsync(async(req, res) => {    
    const { landlordId } = req.params;
    const houses = await getAllLandlordHouseService(landlordId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'House retrieved successfully',
        data: houses
    })
});

export const getSingleHouse = catchAsync(async(req, res) => { 
    const { houseId } = req.params;   
    const result = await getHouseByIDService(houseId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `House-${houseId} retrieved successfully`,
        data: result
    })
});

export const updateHouse = catchAsync(async(req, res) => { 
    const { houseId } = req.params;   
    const houseData = req.body;
    const result = await updateHouseByIDSevice(houseId, houseData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `House-${houseId} updated successfully`,
        data: result
    })
});

export const deleteHouse = catchAsync(async(req, res) => { 
    const { houseId } = req.params;   
    const result = await deleteHouseByIDService(houseId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `House-${houseId} deleted successfully`,
        data: result
    })
});