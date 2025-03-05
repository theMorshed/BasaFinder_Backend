import { Types } from "mongoose";

export interface IHouse {
  landlord: Types.ObjectId;
  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  amenities: string[];
  images: string[];
}