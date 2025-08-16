import { AccomodationRepository } from "./accomodation.repository.js";
import { getAccomodationContext } from "../accomodation.context.js";
import { Accomodation } from "../accomodation.model.js";

export const mongoDBRepository: AccomodationRepository = {
  paginateAccomodationList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getAccomodationContext().find().skip(skip).limit(limit).toArray();
  },
  getAccomodation: async (id: string) => {
    return await getAccomodationContext().findOne({
      _id: id,
    })
  },
  updateAccomodation()
  saveAccomodation: async (accomodation: Accomodation) => {
    Boolean(accomodation._id) ? updateAccomodation(accomodation) : insertAccomodation(accomodation),
  },
  deleteAccomodation: async (id: string) => {
    const { deletedCount } = await getAccomodationContext().deleteOne({
      _id: id,
    });
    return deletedCount === 1;
  },
};
