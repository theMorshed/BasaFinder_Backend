import { Types } from "mongoose";

export interface IHouse {
  location: string;
  description: string;
  rent_amount: number;
  bedrooms_number: number;
  images: string[];
  landlord_id: Types.ObjectId;
}
