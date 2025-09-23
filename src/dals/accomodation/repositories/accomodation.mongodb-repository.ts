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

  addReview: async (accomodation: Accomodation, newReview: Review) => {
    return await getAccomodationContext()
      .findOneAndUpdate(
        {
          _id: accomodation._id,
        },
        { $push: { reviews: newReview } },
        { upsert: true, returnDocument: 'after' }
      )

  },

};