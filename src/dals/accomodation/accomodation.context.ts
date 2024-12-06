import { Accomodation } from "./accomodation.model.js";
import { dbServer } from "#core/servers/db.server.js";

export const getAccomodationContext = () => dbServer.db?.collection<Accomodation>('listingsAndReviews');