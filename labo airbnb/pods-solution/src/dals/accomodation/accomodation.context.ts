import { dbServer } from '#core/servers/index.js';
import { Accomodation } from './accomodation.model.js';

export const getAccomodationContext = () => dbServer.db?.collection<Accomodation>('airbnb-db');