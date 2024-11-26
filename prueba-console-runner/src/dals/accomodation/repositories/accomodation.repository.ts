import { Accomodation } from "../accomodation.model.js";

export interface AccomdationRepository {
    getAccomodationList: (page?: number, pageSize?: number) => Promise<Accomodation[]>;
    getAccomodation: (id: string) => Promise<Accomodation>;
    saveAccomodation: (accomodation: Accomodation) => Promise<Accomodation>;
    deleteAccomodation: (id: string) => Promise<boolean>;
}
