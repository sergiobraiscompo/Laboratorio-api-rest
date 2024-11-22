import { ENV } from "../../../core/constants/env.constants.js";
import { mockRepository } from "./accomodation.mock-repository.js";
import { mongoDBRepository } from "./accomodation.mongodb-repository.js";

export const accomodationRepository = ENV.IS_API_MOCK
  ? mockRepository
  : mongoDBRepository;
