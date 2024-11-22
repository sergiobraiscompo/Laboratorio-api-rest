import { dbServer } from '#core/servers/db.server.js';
import { Accomdation } from './accomodation.model.js';

export const getAccomodationContext = dbServer.db.collection<Accomdation>('listingsAndReviews');