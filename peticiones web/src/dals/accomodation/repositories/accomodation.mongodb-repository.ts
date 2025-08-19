import { AccomodationRepository } from "./accomodation.repository.js";
import { getAccomodationContext } from "../accomodation.context.js";
import { Accomodation, Review } from "../accomodation.model.js";
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
    });
  },
  saveAccomodation: async (accomodation: Accomodation) => {
    return await getAccomodationContext().findOneAndUpdate(
      {
        _id: accomodation._id,
      },
      { $set: accomodation.reviews },
      { upsert: true, returnDocument: 'after' }
    );
  },
  addReview: async (id: string, newReview: Review) => {
    return await accomodation
      .findOneAndUpdate(
        {
          _id: book._id,
        },
        { $set: book },
        { upsert: true, returnDocument: 'after' }
      )
      .lean();
  },
  deleteAccomodation: async (id: string): Promise<Boolean> => {
    const { deletedCount } = await getAccomodationContext().deleteOne({
      _id: new ObjectId(id),
    });
    return deletedCount === 1;
  },
};
