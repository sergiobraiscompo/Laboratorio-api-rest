import { Accomodation } from "../accomodation.model.js";
import { AccomdationRepository } from "./accomodation.repository.js";

export const mongoDBRepository: AccomdationRepository = {
  getAccomodationList: async (page?: number, pageSize?: number) => {
    throw new Error("Not implemented");
  },
  getAccomodation: async (id: string) => {
    throw new Error("Not implemented");
  },
  saveAccomodation: async (accomodation: Accomodation) => {
    throw new Error("Not implemented");
  },
  deleteAccomodation: async (id: string) => {
    throw new Error("Not implemented");
  },
};
