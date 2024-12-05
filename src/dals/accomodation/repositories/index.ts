import { mockRepository } from "./accomodation.mock-repository.js";
import { mongoDBRepository } from "./accomodation.mongodb-repository.js";
import { ENV } from "#core/constants/index.js";

export const accomodationRepository = ENV.IS_API_MOCK
  ? mockRepository
  : mongoDBRepository;
