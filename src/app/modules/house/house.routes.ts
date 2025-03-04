import express from 'express';
import { createHouse, deleteHouse, getAllHouses, getSingleHouse, updateHouse } from './house.controller';
import validateRequest from '../../middlewares/validateRequest';
import { registerHouseSchema, updateHouseSchema } from './house.validation';

// Create an instance of the express Router
const router = express.Router();

router.post('/create-house', validateRequest(registerHouseSchema), createHouse);
router.get('/', getAllHouses);
router.get('/:houseId', getSingleHouse);
router.put('/:houseId', validateRequest(updateHouseSchema), updateHouse);
router.delete('/:houseId', deleteHouse);

// Export the router so it can be used in the main app file
export const houseRoutes = router;
