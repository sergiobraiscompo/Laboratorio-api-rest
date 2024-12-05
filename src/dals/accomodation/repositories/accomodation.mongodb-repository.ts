import { AccomodationRepository } from "./accomodation.repository.js";
import { Accomodation } from "../accomodation.model.js";
import { getAccomodationContext } from "../accomodation.context.js";
import { ObjectId } from "mongodb";

export const mongoDBRepository: AccomodationRepository = {
  getAccomodationList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getAccomodationContext().find().skip(skip).limit(limit).toArray();
  },
  getAccomodation: async (id: string) => {
    return await getAccomodationContext().findOne({
      _id: new ObjectId(id),
    })
  },
  saveAccomodation: async (accomodation: Accomodation) => {
    return getAccomodationContext().findOneAndUpdate(
      { _id: accomodation._id },
      { $set: accomodation },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );
  },
  deleteAccomodation: async (id: string) => {
    const { deletedCount } = await getAccomodationContext().deleteOne({
      _id: new ObjectId(id),
    });
    return deletedCount === 1;
  },
};
