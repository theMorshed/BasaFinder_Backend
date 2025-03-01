import { z } from 'zod';

export const registerHouseSchema = z.object({
    location: z.string().min(1, 'Location is required'),
    description: z.string().min(1, 'Description is required'),
    rent_amount: z.number().min(0, 'rent amount must be a positive number'),
    bedrooms_number: z.number().min(0, 'bedrooms must be a positive number'),
    images: z.string().min(1, 'images is required'),
    landlord_id: z.string().min(1, 'landlord id is required')
});

export const updateHouseSchema = registerHouseSchema.partial();