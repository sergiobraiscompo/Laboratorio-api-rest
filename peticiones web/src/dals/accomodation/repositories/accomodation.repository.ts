import { Accomodation, Review } from "../accomodation.model.js";

export interface AccomodationRepository {
  paginateAccomodationList: (page?: number, pageSize?: number) => Promise<Accomodation[]>;
  getAccomodation: (id: string) => Promise<Accomodation>;
  updateAccomodation: (id: string, accomodation: Accomodation) => Promise<Accomodation>;
  deleteAccomodation: (id: string) => Promise<boolean>;
}
