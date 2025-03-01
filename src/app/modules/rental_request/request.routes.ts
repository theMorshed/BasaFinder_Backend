import express from 'express';
import auth from '../../middlewares/auth';
import { createRentalRequest, deleteRequest, getAllRequest, getSingleRequest, getTenantRequest, updateRequest, verifyPayment } from './request.controller';

const orderRouter = express.Router();

orderRouter.get('/verify/:order_id', verifyPayment);
orderRouter.post('/create-request', auth('tenant'), createRentalRequest);
orderRouter.get('/', auth('admin', 'tenant'), getAllRequest);
orderRouter.get('/:requestId', auth('tenant'), getSingleRequest);
orderRouter.put('/:requestId', auth('tenant'), updateRequest);
orderRouter.delete('/:requestId', auth('tenant'), deleteRequest);
orderRouter.get('/tenant/:tenantId', auth('tenant'), getTenantRequest);

export default orderRouter;
