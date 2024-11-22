import { model, Schema } from "mongoose";
import { Accomodation } from "./accomodation.model.js";

const accomodationSchema = new Schema<Accomodation>({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: Schema.Types.String, required: true },
    image: { type: Schema.Types.String, required: true },
    address: { type: Schema.Types.String, required: true },
    bedrooms: { type: Schema.Types.Number, required: true },
    beds: { type: Schema.Types.Number, required: true },
    bathrooms: { type: Schema.Types.Number, required: true },
    description: { type: Schema.Types.String, required: true },
})

export const accomodationContext = model<Accomodation>('listingsAndReviews', accomodationSchema);