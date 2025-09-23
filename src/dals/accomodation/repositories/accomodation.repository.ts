import { Accomodation, Review } from "../accomodation.model.js";

export interface AccomodationRepository {
  getAccomodationList: (page?: number, pageSize?: number) => Promise<Accomodation[]>;
  getAccomodation: (id: string) => Promise<Accomodation>;
  addReview: (accomodation: Accomodation, newReview: Review) => Promise<Accomodation>;
}
