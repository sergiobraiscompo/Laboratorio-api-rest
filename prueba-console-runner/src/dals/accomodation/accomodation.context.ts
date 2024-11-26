import { dbServer } from '#core/servers/db.server.js';
import { Accomodation } from './accomodation.model.js';

export const getAccomodationContext = dbServer.db.collection<Accomodation>('listingsAndReviews');