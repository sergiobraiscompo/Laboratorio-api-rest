import { Accomodation, Review } from "../accomodation.model.js";

export interface AccomodationRepository {
  paginateAccomodationList: (page?: number, pageSize?: number) => Promise<Accomodation[]>;
  getAccomodation: (id: string) => Promise<Accomodation>;
  updateAccomodation: (accomodation: Accomodation) => Promise<Accomodation>;
  saveAccomodation: (accomodation: Accomodation) => Promise<Accomodation>;
  deleteAccomodation: (id: string) => Promise<boolean>;
}
