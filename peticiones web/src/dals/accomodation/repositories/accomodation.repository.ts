import { ObjectId } from "mongodb";
import { Accomodation, Review } from "../accomodation.model.js";

export interface AccomodationRepository {
  getAccomodationList: (page?: number, pageSize?: number) => Promise<Accomodation[]>;
  getAccomodation: (id: string) => Promise<Accomodation>;
  saveAccomodation: (accomodation: Accomodation) => Promise<Accomodation>;
  addReview: (id: string, newReview: Review) => Promise<Accomodation>;
  deleteAccomodation: (id: string) => Promise<Boolean>;
}
