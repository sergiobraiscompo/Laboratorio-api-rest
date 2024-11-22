import { ENV } from '#core/constants/index.js';
import { mockRepository } from './accomodation.mock-repository.js';
import { mongoDBRepository } from './accomodation.mongodb-repository.js';

export const AccomodationRepository = ENV.IS_API_MOCK
  ? mockRepository
  : mongoDBRepository;
