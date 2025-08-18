import { AccomodationRepository } from "./accomodation.repository.js";
import { getAccomodationContext } from "../accomodation.context.js";
import { Accomodation, Review } from "../accomodation.model.js";
import { response } from "express";
import { ObjectId } from "mongodb";

export const mongoDBRepository: AccomodationRepository = {
  paginateAccomodationList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getAccomodationContext().find().skip(skip).limit(limit).toArray();
  },
  getAccomodation: async (id: string) => {
    try {
      return await getAccomodationContext().findOne({
        _id: id,
      })
    } catch {
    }
  },
  insertAccomodation: async (accomodation: Accomodation): Promise<Accomodation> => {
    await getAccomodationContext().insertOne(accomodation)
    return accomodation;
  },
  updateAccomodation: async (id: ObjectId, newReview: Review): Promise<Accomodation> => {
    const accomodation = await getAccomodationContext().findOne(id);
    accomodation.reviews.push(newReview);
    return accomodation;
  },
  deleteAccomodation: async (id: string): Promise<Boolean> => {
    const { deletedCount } = await getAccomodationContext().deleteOne({
      _id: id,
    });
    return deletedCount === 1;
  },
};
