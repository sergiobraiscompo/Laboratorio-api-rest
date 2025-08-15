import { AccomodationRepository } from "./accomodation.repository.js";
import { Accomodation } from "../accomodation.model.js";
import { db } from "../../mock-data.js";
import { ObjectId } from "mongodb";

const insertAccomodation = (accomodation: Accomodation) => {
  const _id = new ObjectId();
  const newAccomodation: Accomodation = {
    ...accomodation,
    _id,
  };

  db.accomodations = [...db.accomodations, newAccomodation];
  return newAccomodation;
};

const updateAccomodation = (accomodation: Accomodation) => {
  db.accomodations = db.accomodations.map((a) => (a._id === accomodation._id ? { ...a, ...accomodation } : a));
  return accomodation;
};

const paginateAccomodationList = (
  accomodationList: Accomodation[],
  page: number,
  pageSize: number
): Accomodation[] => {
  let paginatedAccomodationList = [...accomodationList];
  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedAccomodationList.length);
    paginatedAccomodationList = paginatedAccomodationList.slice(startIndex, endIndex);
  }

  return paginatedAccomodationList;
};

export const mockRepository: AccomodationRepository = {
  paginateAccomodationList: async (page?: number, pageSize?: number) =>
    paginateAccomodationList(db.accomodations, page, pageSize),
  getAccomodation: async (id: string) => db.accomodations.find((a) => a._id === id),
  saveAccomodation: async (accomodation: Accomodation) =>
    db.accomodations.some((a) => a._id === accomodation._id)
      ? updateAccomodation(accomodation)
      : insertAccomodation(accomodation),
  deleteAccomodation: async (id: string) => {
    const exists = db.accomodations.some((a) => a._id === id);
    db.accomodations = db.accomodations.filter((a) => a._id !== id);
    return exists;
  },
};
