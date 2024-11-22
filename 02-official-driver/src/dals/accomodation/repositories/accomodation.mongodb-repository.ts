import { AccomodationRepository } from "./accomodation.repository.js";
import { Accomodation } from "../accomodation.model.js";
import { accomodationContext } from "../accomodation.context.js";
import { ObjectId } from "mongodb";

export const mongoDBRepository: AccomodationRepository = {
  getAccomodationList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await accomodationContext.find().skip(skip).limit(limit).lean();
  },
  getAccomodation: async (id: string) => {
    return await accomodationContext.findOne({
      _id: new ObjectId(id),
    }).lean()
  },
  saveAccomodation: async (accomodation: Accomodation) => {
    return accomodationContext.findOneAndUpdate(
      { _id: accomodation._id },
      { $set: accomodation },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );
  },
  deleteAccomodation: async (id: string) => {
    const { deletedCount } = await accomodationContext.deleteOne({
      _id: new ObjectId(id),
    });
    return deletedCount === 1;
  },
};
