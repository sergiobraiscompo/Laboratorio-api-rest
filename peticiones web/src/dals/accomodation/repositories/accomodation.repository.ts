import { ObjectId } from "mongodb";
import { Accomodation, Review } from "../accomodation.model.js";

export interface AccomodationRepository {
  paginateAccomodationList: (page?: number, pageSize?: number) => Promise<Accomodation[]>;
  getAccomodation: (id: string) => Promise<Accomodation>;
  insertAccomodation: (accomodation: Accomodation) => Promise<Accomodation>;
  updateAccomodation: (id: ObjectId, newReview: Review) => Promise<Accomodation>;
  deleteAccomodation: (id: string) => Promise<Boolean>;
}
