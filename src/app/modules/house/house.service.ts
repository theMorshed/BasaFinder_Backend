import QueryBuilder from "../../builder/QueryBuilder";
import { IHouse } from "./house.interface";
import House from "./house.model";

export const createHouseService = async (house: IHouse) => {
  // Create and save the new house in MongoDB
  const result = await House.create(house);
  return result;
}

export const getAllHouseService = async (query: Record<string, unknown>): Promise<IHouse[]> => {
  const houseQuery = new QueryBuilder(House.find(), query)
    .search(['location', 'description'])
    .sort()
    .filter();
    
  const houses = await houseQuery.modelQuery;
  return houses;
}

export const getAllLandlordHouseService = async(landlordId: string) => {
  const result = await House.find({landlord: landlordId});
  return result;
}

export const getHouseByIDService = async (id: string) => {
  // Find and return the bike by its ID
  const result = await House.findById(id);
  return result;
}

export const updateHouseByIDSevice = async (id: string, houseData: any) => {
  // Find the house by ID and update it with the new data
  const result = await House.findByIdAndUpdate(id, houseData, { new: true });
  return result;
}

export const deleteHouseByIDService = async (id: string) => {
  // Find the house by ID and delete it
  const result = await House.findByIdAndDelete(id);
  return result;
}

