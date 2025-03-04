import express from 'express';
import auth from '../../middlewares/auth';
import { createRentalRequest, deleteRequest, getAllRequest, getSingleRequest, getTenantRequest, updateRequest, verifyPayment } from './request.controller';

const router = express.Router();

router.get('/verify/:order_id', verifyPayment);
router.post('/create-request', auth('tenant'), createRentalRequest);
router.get('/', auth('admin', 'tenant'), getAllRequest);
router.get('/:requestId', auth('tenant'), getSingleRequest);
router.put('/:requestId', auth('tenant'), updateRequest);
router.delete('/:requestId', auth('tenant'), deleteRequest);
router.get('/tenant/:tenantId', auth('tenant'), getTenantRequest);

export const requestRoutes = router;
