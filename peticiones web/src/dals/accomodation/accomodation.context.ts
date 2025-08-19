import { Accomodation } from "./accomodation.model.js";
import { dbServer } from "#core/servers/db.server.js";

const accomodationSchema = new

export const getAccomodationContext = () => dbServer.db?.collection<Accomodation>('listingsAndReviews');