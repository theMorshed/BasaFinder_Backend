import { z } from 'zod';

export const registerHouseSchema = z.object({
    landlord: z.string().min(1, 'landlord id is required'),
    location: z.string().min(1, 'Location is required'),
    description: z.string().min(1, 'Description is required'),
    rentAmount: z.number().min(0, 'rent amount must be a positive number'),
    bedrooms: z.number().min(0, 'bedrooms must be a positive number'),
    amenities: z.array(z.string()).nonempty('At least one amenity is required'),
    images: z.array(z.string().url()).nonempty('At least one image is required'),
});

export const updateHouseSchema = registerHouseSchema.partial();